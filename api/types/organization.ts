/*
 * Copyright (C) 2023 TASKY - All Rights Reserved
 *
 * Authors:
 * Rickson Muchedzi - rrmuchedzi@gmail.com
 */

import * as r from 'runtypes';
import { validateOrganizationDescription, validateOrganizationName } from '../validators';
import { IdEntitySchema } from '.';

export const OrganizationSchema = r.Record({
    name: r.String.withConstraint(validateOrganizationName),
    description: r.String.withConstraint(validateOrganizationDescription)
});
export type Organization = r.Static<typeof OrganizationSchema>;

export const OrganizationResourceSchema = OrganizationSchema.extend(IdEntitySchema.fields);
export type OrganizationResource = r.Static<typeof OrganizationResourceSchema>;