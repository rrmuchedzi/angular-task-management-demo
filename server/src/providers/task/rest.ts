/*
 * Copyright (C) 2023 TASKY - All Rights Reserved
 *
 * Authors:
 * Rickson Muchedzi - https://muchedzi.com
 */

import { Router } from 'express';
import { CreateTaskEndpoint, DeleteTaskEndpoint, UpdateTaskEndpoint } from '../../../../api/endpoints/task';
import { handle } from '../../../../api/routes';
import { authenticateUserRequest, convertToMongoId } from '../auth/utils/requests';
import { handleCreateTaskRequest, handleDeleteTaskRequest, handleUpdateTaskRequest } from './api';

// Create generic router to bind endpoints to
export const taskRouter = Router();

handle(taskRouter, CreateTaskEndpoint, async ({ req, body }) => {
    const { userId } = await authenticateUserRequest(req);
    return handleCreateTaskRequest(userId, body);
});

handle(taskRouter, UpdateTaskEndpoint, async ({ req, body }) => {
    const { userId } = await authenticateUserRequest(req);
    const taskId = convertToMongoId(req.params['taskId']);
    return handleUpdateTaskRequest(userId, taskId, body);
});

handle(taskRouter, DeleteTaskEndpoint, async ({ req, body }) => {
    const { userId } = await authenticateUserRequest(req);
    const taskId = convertToMongoId(req.params['taskId']);
    return handleDeleteTaskRequest(userId, taskId);
});