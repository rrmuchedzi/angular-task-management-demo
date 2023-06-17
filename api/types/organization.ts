/*
 * Copyright (C) 2023 TASKY - All Rights Reserved
 *
 * Authors:
 * Rickson Muchedzi - https://muchedzi.com
 */

import * as r from 'runtypes';
import { validateOrganizationDescription, validateOrganizationName } from '../validators';
import { IdEntitySchema, TimestampSchema } from '.';

export const OrganizationSchema = r.Record({
    name: r.String.withConstraint(validateOrganizationName),
    description: r.String.withConstraint(validateOrganizationDescription)
});
export type Organization = r.Static<typeof OrganizationSchema>;

export const OrganizationResourceSchema = OrganizationSchema.extend(IdEntitySchema.fields).extend(TimestampSchema.fields);
export type OrganizationResource = r.Static<typeof OrganizationResourceSchema>;