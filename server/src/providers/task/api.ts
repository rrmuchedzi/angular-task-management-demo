/*
 * Copyright (C) 2023 TASKY - All Rights Reserved
 *
 * Authors:
 * Rickson Muchedzi - https://muchedzi.com
 */

import { Task, TaskResource } from "../../../../api/types/task";
import { StatusError } from "../../../../api/utils/error";
import { HttpStatus } from "../../../../api/utils/https";
import { TaskModel, toTaskApiObject } from "../../entities";

/**
 * Handles the request to create a new task.
 * 
 * @param creatorId Creator identification.
 * @param task Created task resource.
 */
export async function handleCreateTaskRequest(creatorId: ObjectIdType, task: Task): Promise<TaskResource> {
    const createdTask = await TaskModel.create({ ...task, creatorId });
    if (createdTask == null) {
        throw new StatusError('Something went wrong. We could not complete your request to create the task.', HttpStatus.BAD_REQUEST);
    }

    return toTaskApiObject(createdTask);
}

/**
 * Handles the request to update an existing task.
 * 
 * @param creatorId Creator identification.
 * @param task Updated task resource.
 */
export async function handleUpdateTaskRequest(creatorId: ObjectIdType, taskId: ObjectIdType, task: Task): Promise<TaskResource> {
    const taskUpdate = await TaskModel.findOneAndUpdate({ _id: taskId, creatorId }, task, { new: true });
    if (taskUpdate == null) {
        throw new StatusError('Something went wrong. We could not complete your request to update the task.', HttpStatus.BAD_REQUEST);
    }

    return toTaskApiObject(taskUpdate);
}

/**
 * Handles the request to update an existing task.
 * 
 * @param creatorId Creator identification.
 * @param task Updated task resource.
 */
export async function handleDeleteTaskRequest(creatorId: ObjectIdType, taskId: ObjectIdType) {
    await TaskModel.findOneAndDelete({ _id: taskId, creatorId });
}