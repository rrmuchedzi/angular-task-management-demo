/*
 * Copyright (C) 2023 TASKY - All Rights Reserved
 *
 * Authors:
 * Rickson Muchedzi - rrmuchedzi@gmail.com
 */

import * as r from 'runtypes';

/**
 * Function that creates appropriate Runtype schema from given enum
 *
 * Found here: https://github.com/pelotom/runtypes/issues/66#issuecomment-788129292
 */
export function runtypeFromEnum<EnumType>(theEnum: Record<string, EnumType>): r.Runtype<EnumType> {
    const values = Object.values<unknown>(theEnum);
    const isEnumValue = (input: unknown): input is EnumType => values.includes(input);
    const errorMessage = (input: unknown): string =>
        `Failed constraint check. Expected one of ${JSON.stringify(values)}, but received ${JSON.stringify(input)}`;
    return r.Unknown.withConstraint<EnumType>((object: any) => isEnumValue(object) || errorMessage(object));
}

export function maybe<T>(runtype: r.Runtype<T>) {
    return runtype.nullable().optional();
}
