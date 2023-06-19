/*
 * Copyright (C) 2023 TASKY - All Rights Reserved
 *
 * Authors:
 * Rickson Muchedzi - https://muchedzi.com
 */

import * as r from 'runtypes';
import { TaskPrioritySchema, TaskStatusSchema } from '../constants/task';
import { validateTaskDescription, validateTaskPoints, validateTaskTitle } from '../validators';
import { IdEntitySchema, TimestampSchema } from '.';

const TaskPointsSchema = r.Number.withConstraint(validateTaskPoints);

export const TaskSchema = r.Record({
    points: TaskPointsSchema,
    status: TaskStatusSchema,
    priority: TaskPrioritySchema,
    title: r.String.withConstraint(validateTaskTitle),
    description: r.String.withConstraint(validateTaskDescription),
});
export type Task = r.Static<typeof TaskSchema>;

export const TaskResourceSchema = TaskSchema.extend(IdEntitySchema.fields).extend(TimestampSchema.fields);
export type TaskResource = r.Static<typeof TaskResourceSchema>;

export const TasksCollectionSchema = r.Array(TaskResourceSchema);

export const TaskStatusUpdateSchema = r.Record({
    status: TaskStatusSchema
});
export type TaskStatusUpdate = r.Static<typeof TaskStatusUpdateSchema>;

export const TaskPriorityUpdateSchema = r.Record({
    priority: TaskPrioritySchema
});
export type TaskPriorityUpdate = r.Static<typeof TaskPriorityUpdateSchema>;
