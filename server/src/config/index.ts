/*
 * Copyright (C) 2023 TASKY - All Rights Reserved
 *
 * Authors:
 * Rickson Muchedzi - https://muchedzi.com
 */

import { join } from 'path';
import convict from 'convict';

export const config = convict({
    port: {
        doc: 'Tasky server default access port.',
        format: 'port',
        default: 3000,
        env: 'PORT',
    },
    database: {
        development: {
            doc: 'Development mongodb connection string.',
            format: String,
            default: 'mongodb://localhost:27017/tasky_development',
            env: 'MONGODB_CONNECTION_STRING',
        },
        test: {
            doc: 'Test mongodb connection string.',
            format: String,
            default: 'mongodb://localhost:27017/tasky_test',
            env: 'MONGODB_CONNECTION_STRING',
        },
    },
    version: {
        doc: 'Tasky server service version.',
        env: 'TASKY_SERVICE_VERSION',
        format: String,
        default: '0.1',
    },
    session: {
        secret: {
            doc: 'Session secrete key',
            format: String,
            default: '4da950f4002c173a2d0c8ae8ee73e34d85895868',
            env: 'SESSION_SECRET',
        },
    },
    winston: {
        combined: {
            doc: 'Winston Combined logs',
            env: 'WINSTON_COMBINED_LOGS',
            format: String,
            default: join(__dirname, '../resources/logs/combined.log'),
        },
        errors: {
            doc: 'Winston Error logs',
            env: 'WINSTON_ERROR_LOGS',
            format: String,
            default: join(__dirname, '../resources/logs/errors.log'),
        },
    },
    quitDelay: {
        doc: 'Number of milliseconds to wait before closing the HTTP server and DB connection',
        format: Number,
        default: 1 * 1000,
        env: 'QUIT_DELAY',
    },
});

config.validate({ allowed: 'strict' });
