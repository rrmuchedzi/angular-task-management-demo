/*
 * Copyright (C) 2023 TASKY - All Rights Reserved
 *
 * Authors:
 * Rickson Muchedzi - https://muchedzi.com
 */

import { FetchError } from './fetch';
import { HttpStatus } from '../../../../api/utils/https';

/**
 * Default handler for http request errors.
 *
 * @param error The captured error
 */
export async function handleError(error: FetchError, redirectUnauthorized: boolean = true) {
    try {
        const commonErrorMessage = 'We could not complete your request, please try again.';
        const errorResponseBody = await error.response.json();

        if (redirectUnauthorized) {
            // Redirect the user the login page, when unauthorized.
            if (error.response.status === HttpStatus.UNAUTHORIZED) {
                window.location.href = 'localhost:4200/login';
                return {
                    reason: 'To continue, please enter your login credentials and sign in to your account.',
                    status: HttpStatus.UNAUTHORIZED,
                };
            }
        }

        return {
            reason: errorResponseBody
                ? errorResponseBody?.reason ?? errorResponseBody?.error ?? commonErrorMessage
                : commonErrorMessage,
            status: error.response.status,
        };
    } catch (error) {
        return {
            reason: 'Please check your internet connection or try again in a few seconds.',
            status: HttpStatus.SERVICE_UNAVAILABLE,
        };
    }
}

// TODO: We need to handle all Unauthorized responses to logout a user

/**
 * By throwing this error in a switch statement default case, TypeScript will warn against unhandled enum cases.
 */
export class UnreachableCaseError extends Error {
    constructor(val: any) {
        super(`Unreachable case: ${JSON.stringify(val, undefined, 2)}`);
    }
}