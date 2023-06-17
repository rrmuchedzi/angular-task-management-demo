/*
 * Copyright (C) 2023 TASKY - All Rights Reserved
 *
 * Authors:
 * Rickson Muchedzi - https://muchedzi.com
 */

import * as r from 'runtypes';
import { TaskPrioritySchema, TaskStatusSchema } from '../constants/task';
import { validateTaskDescription, validateTaskPoints, validateTaskTitle } from '../validators';
import { DateSchema, IdEntitySchema, TimestampSchema } from '.';
import { UserSchema } from './user';

const TaskPointsSchema = r.Number.withConstraint(validateTaskPoints);

export const TaskSchema = r.Record({
    dueDate: DateSchema,
    points: TaskPointsSchema,
    status: TaskStatusSchema,
    priority: TaskPrioritySchema,
    title: r.String.withConstraint(validateTaskTitle),
    description: r.String.withConstraint(validateTaskDescription),
});
export type Task = r.Static<typeof TaskSchema>;

export const TaskResourceSchema = r.Record({
    reporter: UserSchema,
}).extend(TaskSchema.fields).extend(IdEntitySchema.fields).extend(TimestampSchema.fields);
export type TaskResource = r.Static<typeof TaskResourceSchema>;