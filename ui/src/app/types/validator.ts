/*
 * Copyright (C) 2023 TASKY - All Rights Reserved
 *
 * Authors:
 * Rickson Muchedzi - https://muchedzi.com
 */

import { AbstractControl, ValidatorFn } from "@angular/forms";

export function whitespaceOnlyValidator(): ValidatorFn {
    return (control: AbstractControl) => {
        const hasWhitespaceOnly = (control.value || '').trim().length === 0;
        return !hasWhitespaceOnly ? null : { whitespaceOnlyExp: true };
    };
}