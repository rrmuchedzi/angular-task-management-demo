/*
 * Copyright (C) 2023 TASKY - All Rights Reserved
 *
 * Authors:
 * Rickson Muchedzi - https://muchedzi.com
 */

import * as r from 'runtypes';
import { UserSchema } from './user';
import { EmailAddressSchema, UserNameSchema } from '.';
import { validatePassword } from '../validators';

export const LoginRequestSchema = r.Record({
    password: r.String,
    email: EmailAddressSchema,
});
export type LoginRequest = r.Static<typeof LoginRequestSchema>;

export const RegisterUserSchema = r
    .Record({
        name: UserNameSchema,
        password: r.String.withConstraint(validatePassword),
    })
    .extend(UserSchema.pick('email').fields);
export type RegisterUser = r.Static<typeof RegisterUserSchema>;
