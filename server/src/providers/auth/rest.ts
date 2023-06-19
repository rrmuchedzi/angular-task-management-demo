/*
 * Copyright (C) 2023 TASKY - All Rights Reserved
 *
 * Authors:
 * Rickson Muchedzi - https://muchedzi.com
 */

import { Router } from 'express';

import {
    getUserResource,
    handleRegisterUserRequest,
    handleUserLoginRequest,
} from './api';
import { HttpStatus } from '../../../..//api/utils/https';
import { handle } from '../../../../api/routes';
import {
    LoginEndpoint,
    LogoutEndpoint,
    RegisterEndpoint,
    VerifySessionEndpoint,
} from '../../../../api/endpoints/auth';
import { StatusError } from '../../../../api/utils/error';
import { authenticateUserRequest } from './utils/requests';

// Create generic router to bind endpoints to
export const authRouter = Router();

handle(authRouter, LoginEndpoint, ({ req, res, next }) => handleUserLoginRequest(req, res, next));

handle(authRouter, RegisterEndpoint, async ({ req, res, next, body }) => {
    // Register new user account and returns username for login.
    const { email } = await handleRegisterUserRequest(body);

    // Set the appropriate email and password to the request.
    req.body.email = email;
    req.body.password = body.password;

    // Login the registered user.
    return handleUserLoginRequest(req, res, next);
});

handle(authRouter, LogoutEndpoint, async ({ req, res }) => {
    req.logOut({ keepSessionInfo: false, }, () => {
        return res.status(HttpStatus.OK).clearCookie('connect.sid', { path: '/' });
    });
});

handle(authRouter, VerifySessionEndpoint, async ({ req }) => {
    if (!req.isAuthenticated()) {
        throw new StatusError('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const { userId } = await authenticateUserRequest(req);
    return getUserResource(userId);
});