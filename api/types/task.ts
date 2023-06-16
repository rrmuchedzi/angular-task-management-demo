/*
 * Copyright (C) 2023 TASKY - All Rights Reserved
 *
 * Authors:
 * Rickson Muchedzi - rrmuchedzi@gmail.com
 */

import * as r from 'runtypes';
import { TaskPrioritySchema, TaskStatusSchema } from '../constants/task';
import { validateTaskDescription, validateTaskPoints, validateTaskTitle } from '../validators';
import { DateSchema, IdEntitySchema, ResourceIdentificationSchema } from '.';

const TaskPointsSchema = r.Number.withConstraint(validateTaskPoints);

export const TaskSchema = r.Record({
    due_date: DateSchema,
    points: TaskPointsSchema,
    status: TaskStatusSchema,
    priority: TaskPrioritySchema,
    title: r.String.withConstraint(validateTaskTitle),
    description: r.String.withConstraint(validateTaskDescription),
});
export type Task = r.Static<typeof TaskSchema>;

export const TaskResourceSchema = r.Record({
    reporter: ResourceIdentificationSchema,
}).extend(TaskSchema.fields).extend(IdEntitySchema.fields);
export type TaskResource = r.Static<typeof TaskResourceSchema>;