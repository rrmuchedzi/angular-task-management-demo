/*
 * Copyright (C) 2023 TASKY - All Rights Reserved
 *
 * Authors:
 * Rickson Muchedzi - https://muchedzi.com
 */

import { createServer } from 'http';
import { config } from './config';
import { boot } from './server';
import { errorLogger, infoLogger, warningLogger } from '../../api/utils/logger';

boot()
    .then(({ expressServer, onClose }) => {
        const http = createServer(expressServer);

        http.listen(config.get('port'), async () => {
            infoLogger(
                `[TASKY⚡SURGE SERVER⚡READY]: ${process.env.NODE_ENV} server started at port: ${config.get('port')}`,
            );
        });

        process.on('SIGTERM', () => {
            infoLogger('SIGTERM signal received');

            // Add a small delay before closing the database and http server, gives time to update connection entries in the database when websockets close
            setTimeout(async () => {
                infoLogger('[DATABASE] Closing database connection.');
                try {
                    await onClose();
                } catch (err) {
                    warningLogger(`Error while closing connection to database.`);
                }

                infoLogger('Closing HTTP server');

                http.close(() => {
                    infoLogger('HTTP server closed');
                    process.exit(0);
                });
            }, config.get('quitDelay'));
        });
    })
    .catch((error: Error) => {
        errorLogger('[APPLICATION ERROR] Application failed and terminated.', error);
        process.exit(1);
    });
