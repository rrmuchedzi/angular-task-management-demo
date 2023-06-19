/*
 * Copyright (C) 2023 TASKY - All Rights Reserved
 *
 * Authors:
 * Rickson Muchedzi - https://muchedzi.com
 */

import passport from 'passport';
import { UserResource } from '../../../../api/types/user';
import {
    TaskModel, UserModel, findUserOrFail, toUserApiObject,
} from '../../entities';
import { HttpStatus } from '../../../..//api/utils/https';
import { StatusError } from '../../../../api/utils/error';
import { RegisterUser } from '../../../../api/types/auth';
import { NextFunction, Request, Response } from 'express';
import { generateSalt, hashCryptograph } from '../../tools/crypto';

export function handleUserLoginRequest(req: Request, res: Response, next: NextFunction) {
    return new Promise(async (resolve, reject) => {
        passport.authenticate('default', (authError: Error, user: UserResource | false, info: string) => {
            if (authError) {
                return reject(authError);
            }

            if (user !== false) {
                req.logIn(user, (loginError) => {
                    if (loginError) {
                        return reject(loginError);
                    }
                    return resolve(user);
                });
            } else {
                // Return the reason why login failed for the user.
                return res.status(HttpStatus.UNAUTHORIZED).json({ reason: info });
            }
        })(req, res, next);
    });
}

/**
 * Handles the request to get user account resource.
 * IMPORTANT: This function is meant to be used on login.
 *
 * @param userId User account identification.
 * @returns User resource
 */
export async function getUserResource(userId: ObjectIdType) {
    // Find the user account resource from the database.
    const user = await findUserOrFail(userId);
    return toUserApiObject(user);
}

/**
 * Handles the request to create a new user account.
 *
 * @param registerUser User account registration request data.
 * @returns User resource record.
 */
export async function handleRegisterUserRequest({ email, password, name, }: RegisterUser) {

    // Verify the provided email is not in use on another account.
    const existingUserAccount = await UserModel.findOne({ email }).collation({ locale: 'en_US', strength: 2 });

    if (existingUserAccount !== null) {
        throw new StatusError(
            'We could not complete your account registration because the provided email is already in use. If you have an account already, you can login instead.',
            HttpStatus.CONFLICT,
        );
    }

    // Generate user account password salt.
    const passwordSalt = generateSalt();

    const user = await UserModel.create(
        {
            name,
            email,
            passwordSalt,
            password: hashCryptograph(password, passwordSalt),
        });

    return toUserApiObject(user);
}
