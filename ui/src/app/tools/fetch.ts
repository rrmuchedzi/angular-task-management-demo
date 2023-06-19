/*
 * Copyright (C) 2023 TASKY - All Rights Reserved
 *
 * Authors:
 * Rickson Muchedzi - https://muchedzi.com
 */

import { stringify } from 'qs';
import { SERVER_URI } from '../../../../api/config';
import { EndpointSync } from '../../../../api/utils/endpointSync';
import { ValidationError } from '../../../../api/utils/error';

/**
 * Extended Error which can also contain the response triggering the error
 * (usually because of a faulty HTTP status code).
 *
 * This response can then be used to get more information about the error
 * by using the response body.
 */
export class FetchError extends Error {
    public response: Response;

    constructor(response: Response) {
        super(response.statusText);
        this.response = response;
    }
}

/**
 * Helper method to check for a error HTTP response.
 * By default, if the request succeeds, the promise will
 * also succeed. However, we would like to have the request also fail
 * if the HTTP status core is below 200 or 300 and higher.
 *
 * @param response The requests response
 */
export async function checkHttpStatus(response: Response): Promise<Response> {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    throw new FetchError(await response);
}

/**
 * Extends the original RequestInit so it allows everything as body
 * (since we're going to serialize it)
 */
interface JsonRequestInit extends Omit<RequestInit, 'body'> {
    body?: any;
    headers?: Record<string, string>;
}

function backendJsonFetch(url: string, init: JsonRequestInit) {
    if (init.body) {
        init.body = JSON.stringify(init.body);

        if (!init.headers) {
            init.headers = {};
        }

        init.headers['Content-Type'] = 'application/json';
    }

    init.credentials = 'include';
    return (
        fetch(`${SERVER_URI}${url}`, init)
            // Check if HTTP Status code is >= 200 && < 300
            .then(checkHttpStatus)
            // Return JSON response body
            .then((r) => r.text())
            .then((c) => (c ? JSON.parse(c) : undefined))
    );
}

export async function endpointFetch<Query, Req, Res>(
    { method, path, requestValidator, responseValidator }: EndpointSync<Query, Req, Res>,
    {
        query,
        body,
        params,
        init = {},
        scope = '',
    }: {
        query?: Query;
        body?: Req;
        params?: { [key: string]: any };
        init?: Omit<JsonRequestInit, 'body'>;
        scope: string;
    },
): Promise<Res> {
    let result;

    // Create init that is allowed to have a body.
    const bodyInit: JsonRequestInit = init;

    // Set HTTP method, converted to uppercase.
    bodyInit.method = method.toUpperCase();

    // If a query is provided, validate request
    let queryString = '';
    if (query) {
        queryString = '?' + stringify(query, { encodeValuesOnly: true });
    }

    // If a body is provided, validate request
    if (body != null && requestValidator != null) {
        const validationResult = requestValidator.validate(body);
        if (validationResult.success) {
            bodyInit.body = validationResult.value;
        } else {
            const message = 'Request body is invalid';
            const extra = { body, validationResult };
            throw new ValidationError(message, extra);
        }
    } else {
        bodyInit.body = body;
    }

    // Create a parameterized path
    const parameterizedPath = params ? endpointPathReplace(path, params) : path;

    // Request!
    result = await backendJsonFetch(`${scope}${parameterizedPath}${queryString}`, bodyInit);

    if (responseValidator != null) {
        const validationResult = responseValidator.validate(result);

        if (validationResult.success) {
            return validationResult.value as Res;
        } else {
            const message = 'Response is invalid';
            const extra = { result, validationResult };
            throw new ValidationError(message, extra);
        }
    } else {
        return result;
    }
}

export function endpointPathReplace(path: string, params: { [key: string]: string }): any {
    let copy = String(path);
    let tag: string[] | null;
    // Loop over the ':name' tags in the path string and replace them by corresponding values from params.
    // Regex for name: should start with an alphabetical character, rest can also be number, _ and -
    const tagRegex = new RegExp(/:[a-zA-Z][\w-]*/, 'g');
    // tslint:disable-next-line: no-conditional-assignment
    while ((tag = tagRegex.exec(path)) !== null) {
        const name = tag[0].substring(1); // Drop ':'
        if (params.hasOwnProperty(name)) {
            copy = copy.replace(tag[0], params[name]);
        } else {
            throw new Error(`Missing parameter value '${name}' for substitution in endpoint: '${copy}'`);
        }
    }
    return copy;
}
