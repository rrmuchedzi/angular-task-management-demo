/*
 * Copyright (C) 2023 TASKY - All Rights Reserved
 *
 * Authors:
 * Rickson Muchedzi - https://muchedzi.com
 */

import * as r from 'runtypes';
import { IdEntitySchema, TimestampSchema, UserNameSchema } from '.';
import { validateEmailAddress } from '../validators';

export const UserSchema = r.Record({
    name: UserNameSchema,
    email: r.String.withConstraint(validateEmailAddress),
});
export type User = r.Static<typeof UserSchema>;

export const UserPasswordSchema = r.Record({
    password: r.String,
});

export const UserResourceSchema = UserSchema.extend(IdEntitySchema.fields).extend(TimestampSchema.fields);
export type UserResource = r.Static<typeof UserResourceSchema>;

export const UpdateNewsletterSubscriptionSchema = r.Record({
    newsletter_subscription: r.Boolean,
});
export type UpdateNewsletterSubscription = r.Static<typeof UpdateNewsletterSubscriptionSchema>;