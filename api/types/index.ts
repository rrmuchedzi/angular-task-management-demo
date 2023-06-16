/*
 * Copyright (C) 2023 TASKY - All Rights Reserved
 *
 * Authors:
 * Rickson Muchedzi - rrmuchedzi@gmail.com
 */

import * as r from 'runtypes';
import { validateEmailAddress, validateResourceIdentification, validateUserName } from '../validators/general';

export const DateSchema = r.String.Or(r.InstanceOf(Date));

export const UserNameSchema = r.String.withConstraint(validateUserName);

export const EmailAddressSchema = r.String.withConstraint(validateEmailAddress);

export const ResourceIdentificationSchema = r.String.withConstraint(validateResourceIdentification);

export const IdEntitySchema = r.Record({ _id: ResourceIdentificationSchema });
export type IdEntity = r.Static<typeof IdEntitySchema>;