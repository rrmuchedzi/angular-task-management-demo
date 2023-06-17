/*
 * Copyright (C) 2023 TASKY - All Rights Reserved
 *
 * Authors:
 * Rickson Muchedzi - https://muchedzi.com
 */

import { PASSWORD_MAX_CHARACTERS, PASSWORD_MIN_CHARACTERS, USER_NAME_LIMIT } from "../constants";
import { emailValidator } from "../regex";

export function validateUserName(name: string) {
    const count = name.trim().length;
    return (
        (count > 0 && count <= USER_NAME_LIMIT) || 'Invalid personal name.'
    );
}

export function validateEmailAddress(email: string) {
    return emailValidator(email) || 'Invalid email address.';
}

export function validateResourceIdentification(identification: string) {
    return (identification.length > 0 && identification.length <= 100 && /^\S+$/.test(identification)) || 'Invalid resource identification.';
}

export function validatePassword(password: string) {
    const passwordCount = password.trim().length;
    return (
        (passwordCount >= PASSWORD_MIN_CHARACTERS && passwordCount <= PASSWORD_MAX_CHARACTERS) ||
        `Invalid account password. A password should have between ${PASSWORD_MIN_CHARACTERS} and ${PASSWORD_MAX_CHARACTERS} characters.`
    );
}
