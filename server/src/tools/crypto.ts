/*
 * Copyright (C) 2023 TASKY - All Rights Reserved
 *
 * Authors:
 * Rickson Muchedzi - https://muchedzi.com
 */

import { createHmac, randomBytes } from 'crypto';

/**
 * Generates a unique salt for hashing resources
 *
 * @param key The password to be hashed
 * @param salt The salt to be used to hash the password
 */
export function generateSalt() {
    return randomBytes(Math.ceil(16)).toString('hex');
}

/**
 * Generates a SHA-512 hash based on password and salt
 *
 * @param key The password to be hashed
 * @param salt The salt to be used to hash the password
 */
export function hashCryptograph(key: string, salt: string) {
    const hash = createHmac('sha512', salt);
    hash.update(key);
    return hash.digest('hex');
}

/**
 * Verifies if the provided password is correct.
 *
 * @param password The password to be verified
 * @param salt The salt used to hash the password
 * @param hashedPassword The hashed password
 */
export function validatePassword(password: string, salt: string, hashedPassword: string): boolean {
    return String(hashedPassword) === hashCryptograph(password, salt);
}