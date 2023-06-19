/*
 * Copyright (C) 2023 TASKY - All Rights Reserved
 *
 * Authors:
 * Rickson Muchedzi - https://muchedzi.com
 */

import { Router } from 'express';
import { CreateTaskEndpoint, DeleteTaskEndpoint, GetTasksEndpoint, UpdateTaskEndpoint, UpdateTaskPriorityEndpoint, UpdateTaskStatusEndpoint } from '../../../../api/endpoints/task';
import { handle } from '../../../../api/routes';
import { authenticateUserRequest, convertToMongoId } from '../auth/utils/requests';
import { handleCreateTaskRequest, handleDeleteTaskRequest, handleGetTasksRequest, handleUpdateTaskPriorityRequest, handleUpdateTaskRequest, handleUpdateTaskStatusRequest } from './api';

// Create generic router to bind endpoints to
export const taskRouter = Router();

handle(taskRouter, GetTasksEndpoint, async ({ req, body }) => {
    const { userId } = await authenticateUserRequest(req);
    return handleGetTasksRequest(userId);
});

handle(taskRouter, CreateTaskEndpoint, async ({ req, body }) => {
    const { userId } = await authenticateUserRequest(req);
    return handleCreateTaskRequest(userId, body);
});

handle(taskRouter, UpdateTaskEndpoint, async ({ req, body }) => {
    const { userId } = await authenticateUserRequest(req);
    const taskId = convertToMongoId(req.params['taskId']);
    return handleUpdateTaskRequest(userId, taskId, body);
});

handle(taskRouter, UpdateTaskStatusEndpoint, async ({ req, body }) => {
    const { userId } = await authenticateUserRequest(req);
    const taskId = convertToMongoId(req.params['taskId']);
    return handleUpdateTaskStatusRequest(userId, taskId, body);
});

handle(taskRouter, UpdateTaskPriorityEndpoint, async ({ req, body }) => {
    const { userId } = await authenticateUserRequest(req);
    const taskId = convertToMongoId(req.params['taskId']);
    return handleUpdateTaskPriorityRequest(userId, taskId, body);
});

handle(taskRouter, DeleteTaskEndpoint, async ({ req, body }) => {
    const { userId } = await authenticateUserRequest(req);
    const taskId = convertToMongoId(req.params['taskId']);
    return handleDeleteTaskRequest(userId, taskId);
});