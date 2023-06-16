/*
 * Copyright (C) 2023 TASKY - All Rights Reserved
 *
 * Authors:
 * Rickson Muchedzi - rrmuchedzi@gmail.com
 */

import { ORGANIZATION_NAME_LIMIT } from "../constants";

export function validateOrganizationName(name: string) {
    const length = name.trim().length;
    return (length > 0 && length <= ORGANIZATION_NAME_LIMIT) || 'Invalid organization name value.';
}

export function validateOrganizationDescription(description: string) {
    const length = description.trim().length;
    return length <= ORGANIZATION_NAME_LIMIT || 'Invalid organization description value value.';
}
