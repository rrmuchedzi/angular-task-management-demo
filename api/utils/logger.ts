/*
 * Copyright (C) 2023 TASKY - All Rights Reserved
 *
 * Authors:
 * Rickson Muchedzi - https://muchedzi.com
 * 
 * Description:
 * Global application logging handler and manager.
 * Utilizes the Winston Logger. More information provided at https://github.com/winstonjs/winston/tree/2.x
 */

import winston, { format } from 'winston';
import { ParamsDictionary } from 'express-serve-static-core';
import { serializeError } from 'serialize-error';

enum Level {
    Error = 'error',
    Warning = 'warn',
    Info = 'info',
    Http = 'http',
    Verbose = 'verbose',
    Debug = 'debug',
    Silly = 'silly',
}

const LevelColors = {
    debug: 'blue',
    bar: 'green',
    warn: 'yellow',
    error: 'red',
    info: 'green',
    http: 'pink',
    silly: 'purple',
};

type logDataType = {
    level: Level;
    user?: number | string;
    message: string;
    exception?: Error | unknown;
    request?: {
        hostname?: string;
        method?: string;
        path?: string;
        params?: ParamsDictionary;
    };
};

/**
 * Configures the Winston Logger. Please user log, for logging any message
 */
export const winstonLogger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: Level.Info,
            format: format.combine(
                format((logInfo) => {
                    // Custom Winston format that takes passed Error object and converts it to JSON in order to log to the console
                    logInfo.exception = serializeError(logInfo.exception);

                    if (logInfo.slack === undefined) {
                        delete logInfo.slack;
                    }

                    return logInfo;
                })(),
                format.colorize(),
                format.printf(({ level, message, ...other }) => {
                    return `[${level}] ${message} ## ${JSON.stringify(other)}`;
                }),
            ),
        }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
        new winston.transports.File({
            filename: '../logs/errors.log',
            level: Level.Error,
        }),
    ],
    format: winston.format.combine(
        winston.format.colorize({
            colors: LevelColors,
        }),
        winston.format.json(),
    ),
});

/**
 * A shared log function for use throughout the application
 *
 * @param logData Object containing information to be logged
 */
const Logger = (logData: logDataType) => {
    // Get logging data
    const { level, user, message, exception } = logData;

    // Log with winston
    winstonLogger.log(level, message, {
        exception,
        user,
        platform_version: '1', // TODO: Create universal project version
    });
};

/**
 * Application encountered errors logger.
 *
 * @param message information for be logged.
 * @param err error exception.
 * @param userId user identification for the active user.
 */
export function errorLogger(message: string, err?: Error | unknown, userId?: number) {
    Logger({
        level: Level.Error,
        message,
        exception: err,
        user: userId,
    });
}

/**
 * Application notifications logger.
 *
 * @param message information for be logged.
 * @param err error exception.
 * @param userId user identification for the active user.
 */
export function infoLogger(message: string, user?: number) {
    Logger({
        level: Level.Info,
        user,
        message,
    });
}

/**
 * Application encountered warnings logger.
 *
 * @param message information for be logged.
 * @param err error exception.
 * @param userId user identification for the active user.
 */
export function warningLogger(message: string, user?: number) {
    Logger({
        level: Level.Warning,
        user,
        message,
    });
}

/**
 * Application debugger logger.
 *
 * @param message information for be logged.
 * @param err error exception.
 * @param userId user identification for the active user.
 */
export function debugLogger(message: string, user?: number) {
    Logger({
        level: Level.Debug,
        user,
        message,
    });
}
