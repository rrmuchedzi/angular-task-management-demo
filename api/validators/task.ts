/*
 * Copyright (C) 2023 TASKY - All Rights Reserved
 *
 * Authors:
 * Rickson Muchedzi - https://muchedzi.com
 */

import { TASK_POINTS_LIMIT, TASK_TITLE_LIMIT } from "../constants";

export function validateTaskTitle(title: string) {
    const length = title.trim().length;
    return (length > 0 && length <= TASK_TITLE_LIMIT) || 'Invalid task title value.';
}

export function validateTaskPoints(points: number) {
    return (points >= 0 && points <= TASK_POINTS_LIMIT) || 'Invalid task points value.';
}

export function validateTaskDescription(description: string) {
    const length = description.trim().length;
    return (length > 0 && length <= TASK_TITLE_LIMIT) || 'Invalid task description value.';
}