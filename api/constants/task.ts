/*
 * Copyright (C) 2023 TASKY - All Rights Reserved
 *
 * Authors:
 * Rickson Muchedzi - https://muchedzi.com
 */

import { runtypeFromEnum } from "../utils/runtypes";

export const TASK_TITLE_LIMIT = 60;

export const TASK_LABEL_LIMIT = 30;

export const TASK_DESCRIPTION_LIMIT = 160;

export const TASK_POINTS_LIMIT = 20;

export enum TaskStatus {
    ToDo = 'To Do',
    InProgress = 'In Progress',
    Done = 'Done',
}
export const TaskStatusSchema = runtypeFromEnum(TaskStatus);

export enum TaskPriority {
    Urgent = 'Urgent',
    High = 'High',
    Normal = 'Normal',
    Low = 'Low',
}
export const TaskPrioritySchema = runtypeFromEnum(TaskPriority);

