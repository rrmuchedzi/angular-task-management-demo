/*
 * Copyright (C) 2023 TASKY - All Rights Reserved
 *
 * Authors:
 * Rickson Muchedzi - https://muchedzi.com
 */

import { Runtype } from 'runtypes';

export enum HttpMethod {
    GET = 'get',
    POST = 'post',
    PATCH = 'patch',
    PUT = 'put',
    DELETE = 'delete',
}

interface Props<Query, Request, Response> {
    method: HttpMethod;
    path: string;
    queryValidator?: Runtype<Query>;
    requestValidator?: Runtype<Request>;
    responseValidator?: Runtype<Response>;
}

/**
 * Definition of an HTTP endpoint.
 * This is/can be used by both frontend and backend to call and handle endpoints,
 * including validation of both request and response.
 * You will need to supply a different backend validator when objects get serialized e.g. Date -> string
 */
export class EndpointSync<Query = any, Request = any, Response = any> {
    public method: HttpMethod;
    public path: string;

    public queryValidator?: Runtype<Query>;
    public requestValidator?: Runtype<Request>;
    public responseValidator?: Runtype<Response>;

    constructor({
        method,
        path,
        queryValidator,
        requestValidator,
        responseValidator,
    }: Props<Query, Request, Response>) {
        this.method = method;
        this.path = path;
        this.queryValidator = queryValidator;
        this.requestValidator = requestValidator;
        this.responseValidator = responseValidator;
    }
}
