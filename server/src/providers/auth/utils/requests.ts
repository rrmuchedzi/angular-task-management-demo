/*
 * Copyright (C) 2023 TASKY - All Rights Reserved
 *
 * Authors:
 * Rickson Muchedzi - https://muchedzi.com
 */

import { Types } from 'mongoose';
import { Request } from 'express';
import { HttpStatus } from '../../../../../api/utils/https';
import { StatusError } from '../../../../../api/utils/error';

/**
 * Authenticates the user from the a request.
 *
 * @param req Request
 * @returns User and space identification
 */
export const authenticateUserRequest = async (req: Request): Promise<{ userId: ObjectIdType }> => {
    const authenticateErrorMessage = 'Unauthorized User';
    try {
        if (req.user == null) {
            throw new StatusError(`${authenticateErrorMessage}`, HttpStatus.UNAUTHORIZED);
        }
        if (req.user) {
            try {
                return { userId: new Types.ObjectId(req.user._id) };
            } catch (e) {
                throw new StatusError(`${authenticateErrorMessage}`, HttpStatus.UNAUTHORIZED);
            }
        }
        throw new StatusError(`${authenticateErrorMessage}`, HttpStatus.UNAUTHORIZED);
    } catch (error) {
        throw new StatusError(`${authenticateErrorMessage}`, HttpStatus.UNAUTHORIZED);
    }
};

export function convertToMongoId(id: string) {
    try {
        if (id == null) {
            throw new StatusError('Identification not provided', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new Types.ObjectId(id);
    } catch (error) {
        throw new StatusError(
            'Something went wrong. The required information was not provided. Try reloading the app and try again.',
            HttpStatus.BAD_REQUEST,
        );
    }
}
