/*
 * Copyright (C) 2023 TASKY - All Rights Reserved
 *
 * Authors:
 * Rickson Muchedzi - https://muchedzi.com
 */

import { NextFunction, Request, Response, Router } from 'express';
import { EndpointSync } from '../utils/endpointSync';
import { HttpStatus } from '../utils/https';
import { ValidationError } from '../utils/error';

export const FAILED_REQUEST_VALIDATION = 'Failed request body';

type EndPointHandler<Query, Req, Res> = (payload: {
    query: Query;
    body: Req;
    req: Request;
    res: Response;
    next: NextFunction;
}) => Res;

class Result<Res> {
    constructor(public statusCode: number, public body?: Res) {}
}

/**
 * This method allows for the use of async await as express route handlers.
 * However, as express doesn't support promises, we just need to async catch it,
 * and pass it on to the next middleware.
 *
 * @param routeHandler Async method that actually handles requests
 */
function handleAsync(routeHandler: (req: Request, res: Response, next: NextFunction) => Promise<any>) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Handle request
            await routeHandler(req, res, next);
        } catch (e) {
            // And if something happens, pass the error on to the express error handler
            next(e);
        }
    };
}

/**
 * Adds error handler for all routes
 *
 * IMPORTANT: Do *NOT* remove the unused next parameter.
 * Express uses this to differentiate between middleware and error handlers
 */
export function errorHandler(error: any, _: Request, res: Response, _next: NextFunction) {
    if (error.status) {
        if (error.body !== undefined) {
            res.status(error.status).json(error.body);
        } else {
            res.status(error.status).json({ error: error.message });
        }
    } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message ?? 'UNKNOWN_ERROR' });
    }
}

export const ok = handleAsync(async (_req: Request, res: Response, _next: NextFunction) => {
    res.status(HttpStatus.OK).send();
});

/**
 * Method for registering an API andpoint with a express compatible server/router
 *
 * @param router The router you want to register against
 * @param definition The API definition containing all information
 * @param handler The method that is used to handle the request & response
 * @param options Optional parameters for thinks like path scope
 */
export function handle<Query, Req, Res>(
    router: Router,
    definition: EndpointSync<Query, Req, Res>,
    handler: EndPointHandler<
        Query,
        Req,
        Res | Promise<Res> | Result<Res> | Promise<Result<Res>> | void | Promise<void>
    >,
    options?: { scope?: string },
) {
    // If scope is provided, prefix the path
    const path = options && options.scope ? options.scope + definition.path : definition.path;
    // Register route
    router[definition.method](path, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const body: Req = getRequestBody(req, definition.requestValidator);

            const query: Query = getRequestQuery(req, definition.queryValidator);

            const result = await handler({ query, body, req, res, next });

            const { status, responseBody } = getResponseBody(result, definition.responseValidator);

            res.status(status).json(responseBody); // In case responseBody is undefined the received json body is empty
        } catch (err: unknown) {
            next(err);
        }
    });
}

function getRequestBody<Query, Req, Res>(req: Request, runtype: EndpointSync<Query, Req, Res>['requestValidator']) {
    if (runtype == null) {
        return req.body;
    }

    const validationResult = runtype.validate(req.body);

    if (validationResult.success) {
        return validationResult.value;
    } else {
        throw new ValidationError('Failed request body', {
            reqBody: req.body,
            validationDetails: validationResult.details,
        });
    }
}

function getRequestQuery<Query, Req, Res>(req: Request, runtype: EndpointSync<Query, Req, Res>['queryValidator']) {
    if (runtype == null) {
        return req.query as unknown as Query;
    }

    const validationResult = runtype.validate(req.query);

    if (validationResult.success) {
        return validationResult.value;
    } else {
        throw new ValidationError('Failed request query', {
            reqQuery: req.query,
            validationDetails: validationResult.details,
        });
    }
}

function getResponseBody<Query, Req, Res>(
    result: void | Res | Result<Res>,
    runtype: EndpointSync<Query, Req, Res>['responseValidator'],
) {
    let status: number = 200;
    let responseBody: Res | undefined;

    if (result != null) {
        if (result instanceof Result) {
            status = result.statusCode;
            // Here the result.body can be undefined, as it is optional in some specific cases
            responseBody = result.body;
        } else {
            responseBody = result;
        }
    }

    // Validate the response body only when it was specified
    if (responseBody != null && runtype != null) {
        const validationResult = runtype.validate(responseBody);

        if (validationResult.success) {
            responseBody = validationResult.value;
        } else {
            throw new ValidationError('Failed response body', {
                responseBody,
                validationDetails: validationResult.details,
            });
        }
    }
    return { status, responseBody };
}
