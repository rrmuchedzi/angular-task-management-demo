/*
 * Copyright (C) 2023 TASKY - All Rights Reserved
 *
 * Authors:
 * Rickson Muchedzi - https://muchedzi.com
 */

import { TaskPriorityUpdateSchema, TaskResourceSchema, TaskSchema, TaskStatusUpdateSchema, TasksCollectionSchema } from '../types/task';
import { EndpointSync, HttpMethod } from '../utils/endpointSync';

export const GetTasksEndpoint = new EndpointSync({
    method: HttpMethod.GET,
    path: '/',
    responseValidator: TasksCollectionSchema,
});

export const CreateTaskEndpoint = new EndpointSync({
    method: HttpMethod.POST,
    path: '/',
    requestValidator: TaskSchema,
    responseValidator: TaskResourceSchema,
});

export const UpdateTaskEndpoint = new EndpointSync({
    method: HttpMethod.PATCH,
    path: '/:taskId',
});

export const UpdateTaskStatusEndpoint = new EndpointSync({
    method: HttpMethod.PATCH,
    path: '/status/:taskId',
    requestValidator: TaskStatusUpdateSchema,
    responseValidator: TaskResourceSchema,
});

export const UpdateTaskPriorityEndpoint = new EndpointSync({
    method: HttpMethod.PATCH,
    path: '/priority/:taskId',
    requestValidator: TaskPriorityUpdateSchema,
    responseValidator: TaskResourceSchema,
});

export const DeleteTaskEndpoint = new EndpointSync({
    method: HttpMethod.DELETE,
    path: '/:taskId',
});