/*
 * Copyright (C) 2023 TASKY - All Rights Reserved
 *
 * Authors:
 * Rickson Muchedzi - https://muchedzi.com
 */

import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../../..//api/utils/https';
import { FAILED_REQUEST_VALIDATION } from '../../../api/routes';

/**
 * Server application global error handler for all routes.
 * All unknown routes are handled here.
 *
 * IMPORTANT: Do *NOT* remove the unused next parameter.
 * Express uses this to differentiate between middleware and error handlers
 */
export function handleError(error: any, req: Request, res: Response, next: NextFunction) {
    if (error.status) {
        if (error.body !== undefined) {
            res.status(error.status).json(error.body);
        } else {
            res.status(error.status).json({ error: error.message });
        }
    } else {
        res.status(
            error.message === FAILED_REQUEST_VALIDATION ? HttpStatus.BAD_REQUEST : HttpStatus.INTERNAL_SERVER_ERROR,
        ).json({ error: error.message ?? 'UNKNOWN_ERROR' });
    }
}
