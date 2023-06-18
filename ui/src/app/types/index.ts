/*
 * Copyright (C) 2023 TASKY - All Rights Reserved
 *
 * Authors:
 * Rickson Muchedzi - https://muchedzi.com
 *
 * Shared Tasky platform dark and light themes.
 */

export enum PlatformTheme {
    Light = 'tasky-light-theme',
    Dark = 'tasky-dark-theme',
}

export enum SnackbarTypes {
    INFO = 'INFO',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
}

export interface SnackbarResource {
    message: string;
    type: SnackbarTypes;
}

export interface TaskCreatorEvent {
    status: boolean;
    referenceId: string;
}