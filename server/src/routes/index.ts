/*
 * Copyright (C) 2023 TASKY - All Rights Reserved
 *
 * Authors:
 * Rickson Muchedzi - https://muchedzi.com
 */

import { Express } from 'express';
import { AUTH_MANAGER_PATH, TASK_MANAGER_PATH } from '../../../api/endpoints';
import { taskRouter } from '../providers/task/rest';
import { authRouter } from '../providers/auth/rest';

/**
 * Register all nested routers to their domain
 *
 * @param expressServer Node Express Server instance.
 */
export const registerPlatformRoutes = (expressServer: Express) => {
    expressServer.use(TASK_MANAGER_PATH, taskRouter);
    expressServer.use(AUTH_MANAGER_PATH, authRouter);
    // expressServer.use(ANALYTICS_MANAGER_PATH, analyticsRouter);
};
