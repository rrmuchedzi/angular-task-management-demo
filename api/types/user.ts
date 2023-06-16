/*
 * Copyright (C) 2023 TASKY - All Rights Reserved
 *
 * Authors:
 * Rickson Muchedzi - rrmuchedzi@gmail.com
 */

import * as r from 'runtypes';
import { IdEntitySchema, UserNameSchema } from '.';
import { validateEmailAddress } from '../validators';
import { OrganizationResourceSchema } from './organization';

export const UserSchema = r.Record({
    fullname: UserNameSchema,
    email: r.String.withConstraint(validateEmailAddress),
});
export type User = r.Static<typeof UserSchema>;

export const UserPasswordSchema = r.Record({
    password: r.String,
});

export const UserResourceSchema = r.Record({
    organizations: r.Array(OrganizationResourceSchema)
}).extend(IdEntitySchema.fields);
export type UserResource = r.Static<typeof UserResourceSchema>;

export const UpdateNewsletterSubscriptionSchema = r.Record({
    newsletter_subscription: r.Boolean,
});
export type UpdateNewsletterSubscription = r.Static<typeof UpdateNewsletterSubscriptionSchema>;