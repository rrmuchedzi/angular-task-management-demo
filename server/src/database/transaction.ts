/*
 * Copyright (C) 2023 TASKY - All Rights Reserved
 *
 * Authors:
 * Rickson Muchedzi - https://muchedzi.com
 * 
 * Description:
 * Exports a transaction session to be used when modifying two or more typegoose models.
 */

import { ClientSession, TransactionOptions } from 'mongodb';
import { StatusError } from '../../../api/utils/error';
import { HttpStatus } from '../../../api/utils/https';

export async function withTransaction(
    session: ClientSession,
    transaction: () => Promise<any>,
    options?: TransactionOptions,
) {
    try {
        await session.withTransaction(transaction, options);
    } catch (error) {
        throw new StatusError(
            'Something went wrong. Failed to complete your request, please try again later.',
            HttpStatus.INTERNAL_SERVER_ERROR,
        );
    } finally {
        await session.endSession();
    }
}
