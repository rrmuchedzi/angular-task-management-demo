/*
 * Copyright (C) 2023 TASKY - All Rights Reserved
 *
 * Authors:
 * Rickson Muchedzi - https://muchedzi.com
 */

import { TaskResourceSchema, TaskSchema } from '../types/task';
import { EndpointSync, HttpMethod } from '../utils/endpointSync';

export const CreateTaskEndpoint = new EndpointSync({
    method: HttpMethod.POST,
    path: '/:organizationId',
    requestValidator: TaskSchema,
    responseValidator: TaskResourceSchema,
});

export const DeleteTaskEndpoint = new EndpointSync({
    method: HttpMethod.DELETE,
    path: '/:organizationId/:taskId',
});