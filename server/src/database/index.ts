/*
 * Copyright (C) 2023 TASKY - All Rights Reserved
 *
 * Authors:
 * Rickson Muchedzi - https://muchedzi.com
 *
 * Description:
 * Implemented for Database connectivity using Mongoose.
 * Depended on the Config.js script which is to be executed first.
 * Connects and exports the mongoose with a database connection.
 */

import { mongoose } from '@typegoose/typegoose';
import { config } from '../config';
import { infoLogger } from '../../../api/utils/logger';

/**
 * Connects the application to a Mongo Database using Mongoose.
 *
 * @returns Mongo database connection.
 */
export async function connectToDatabase(): Promise<typeof import('mongoose')> {
    infoLogger('[DATABASE] Connecting to the database.');

    // Check the environment and select appropriate database.
    const databaseURI = getDatabaseConnectionString();

    const mongooseClient = await mongoose.connect(databaseURI);

    if (!mongooseClient) {
        throw new Error('Failed to connect to mongo database server.');
    }

    return mongooseClient;
}

/**
 * Gets and returns the respective database connection string.
 */
export function getDatabaseConnectionString() {
    switch (process.env.NODE_ENV) {
        case 'development': {
            return config.get('database').development;
        }
        case 'test': {
            return config.get('database').test;
        }
        default: {
            throw new Error('Failed to connect to the database. Ensure the database connection string for the environment is set.');
        }
    }
}