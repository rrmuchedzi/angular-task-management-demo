/*
 * Copyright (C) 2023 TASKY - All Rights Reserved
 *
 * Authors:
 * Rickson Muchedzi - https://muchedzi.com
 */

import { Request } from 'express';
import { Strategy } from 'passport';
import { UserModel, toUserApiObject } from '../entities';
import { validatePassword } from '../tools/crypto';
import { HttpStatus } from '../../..//api/utils/https';
import { StatusError } from '../../../api/utils/error';

/**
 * This implements a custom Passport.JS strategy to authenticate users.
 */
export class DefaultStrategy extends Strategy {
    public name = 'default';
    /**
     * This method is called by the Passport.JS middleware.
     * From here it should call this.validate or this.error to indicate the result of the authentication.
     *
     * @param req The request that triggered the authentication
     */
    public async authenticate(req: Request) {
        if (typeof req.body.email === 'string' || typeof req.body.password === 'string') {
            try {
                await this.validate(req.body.email, req.body.password);
            } catch (e) {
                this.error(e);
            }
        } else {
            this.error(new StatusError('Incorrect body', HttpStatus.BAD_REQUEST));
        }
    }

    /**
     * This will perform a simple validation of the incoming email and password.
     *
     * @param email The supplied email
     * @param password The supplied password
     */
    private async validate(email: string, password: string) {
        try {
            const failedValidationMessage = 'Invalid email or password';
            const user = await UserModel.findOne({ email }).select(['+password', '+passwordSalt']).exec();

            if (user == null) {
                return this.fail(failedValidationMessage);
            }

            if (validatePassword(password, user.passwordSalt, user.password)) {
                return this.success(toUserApiObject(user));
            }

            this.fail(failedValidationMessage)
        } catch (e) {
            this.fail('Authentication error', HttpStatus.UNAUTHORIZED);
        }
    }
}
