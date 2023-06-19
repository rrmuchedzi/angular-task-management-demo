/*
 * Copyright (C) 2023 TASKY - All Rights Reserved
 *
 * Authors:
 * Rickson Muchedzi - https://muchedzi.com
 */

import { LoginRequestSchema, RegisterUserSchema } from "../types/auth";
import { UserResourceSchema } from "../types/user";
import { EndpointSync, HttpMethod } from "../utils/endpointSync";

export const LoginEndpoint = new EndpointSync({
    method: HttpMethod.POST,
    path: '/login',
    requestValidator: LoginRequestSchema,
    responseValidator: UserResourceSchema,
});

export const RegisterEndpoint = new EndpointSync({
    method: HttpMethod.POST,
    path: '/register',
    requestValidator: RegisterUserSchema,
    responseValidator: UserResourceSchema,
});

export const LogoutEndpoint = new EndpointSync({
    method: HttpMethod.GET,
    path: '/logout',
});

export const VerifySessionEndpoint = new EndpointSync({
    method: HttpMethod.GET,
    path: '/verify/session',
    responseValidator: UserResourceSchema,
});