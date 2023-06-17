/*
 * Copyright (C) 2023 TASKY - All Rights Reserved
 *
 * Authors:
 * Rickson Muchedzi - https://muchedzi.com
 */

import url from 'url';
import cors from 'cors';
import express from 'express';

import { connectToDatabase } from './database';
import { HttpStatus } from '../../api/utils/https';
import { infoLogger } from '../../api/utils/logger';
import { registerPlatformRoutes } from './routes';
import { handleError } from './tools/handler';

export async function boot() {
    infoLogger('[TASKY] Starting tasky server 🏁');

    // Establish database connection
    const mongooseClientConnection = await connectToDatabase();

    infoLogger('[SERVER] Configuring the express server.');

    // Create an Express Server Application.
    const expressServer = express();

    // Express application server configuration.
    expressServer.use(
        express.json({
            limit: '1mb',
            type: 'application/json',
        }),
    );

    expressServer.use(
        cors({
            origin: true,
            exposedHeaders: ['Content-Length'],
            allowedHeaders: ['Content-Type', 'Access-Control-Allow-Origin', 'Accept'],
            methods: ['GET', 'POST', 'DELETE', 'PATCH'],
            optionsSuccessStatus: 200,
            credentials: true,
        }),
    );

    // Register the application routes
    registerPlatformRoutes(expressServer);

    // Add error handling
    addErrorHandler(expressServer);

    return {
        expressServer,
        mongooseClientConnection,
        onClose: async () => {
            await mongooseClientConnection.connection.close();
        },
    };
}

function addErrorHandler(serverHandler: express.Express) {
    infoLogger('[ERROR HANDLER] Registering error handler.');
    // Add general error handler to the server
    serverHandler.use(handleError);

    // Adds catch all route to return nice JSON 404 error
    serverHandler.all('*', (req, res) => {
        const link = url.parse(req.url).pathname;
        if (link) {
            res.redirect(link);
        } else {
            res.status(HttpStatus.NOT_FOUND).json({ error: 'UNKNOWN_PATH' });
        }
    });
}

/**
 * Some trickery to get the return type of the Promise from the "boot" method.
 */
type Unpacked<T> = T extends Promise<infer U> ? U : T;
export type Server = Unpacked<ReturnType<typeof boot>>;
