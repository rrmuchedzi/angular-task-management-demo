/*
 * Copyright (C) 2023 TASKY - All Rights Reserved
 *
 * Authors:
 * Rickson Muchedzi - https://muchedzi.com
 */

import { DocumentType, modelOptions, mongoose, pre, prop, Severity } from '@typegoose/typegoose';
import { TaskResource, Task as TaskType } from '../../../api/types/task';
import { TASK_DESCRIPTION_LIMIT, TASK_POINTS_LIMIT, TASK_TITLE_LIMIT, TaskPriority, TaskStatus } from '../../../api/constants';
import { toUserReporter, User } from './user';

@modelOptions({
    options: {
        allowMixed: Severity.ALLOW,
    },
})
@pre<Task>('save', function () {
    this.updatedAt = Date.now();
})
export class Task implements TaskType {
    @prop({ required: true, type: String, minlength: 1, maxlength: TASK_TITLE_LIMIT })
    public title: string;

    @prop({ required: true, type: String, minlength: 1, maxlength: TASK_DESCRIPTION_LIMIT })
    public description: string;

    @prop({ required: true, type: Number })
    public dueDate: string;

    @prop({ required: true, type: Number, min: 0, max: TASK_POINTS_LIMIT })
    public points: number;

    @prop({ required: true, enum: TaskStatus })
    public status: TaskStatus;

    @prop({ required: true, enum: TaskPriority })
    public priority: TaskPriority;

    @prop({ required: true, type: mongoose.Schema.Types.ObjectId, select: false })
    public organizationId: ObjectIdType;

    @prop({ required: true, type: mongoose.Schema.Types.ObjectId, immutable: true, select: false })
    public reporter: ObjectIdType;

    @prop({ required: true, type: Number, immutable: true, default: Date.now() })
    public createdAt: number;

    @prop({ required: true, type: Number, default: Date.now() })
    public updatedAt: number;
}

/**
 * Converts the provided user database document to a user api resource.
 *
 * @param user user database record.
 */
export function toTaskApiObject(user: DocumentType<Task>, reporter: DocumentType<User>): TaskResource {
    return {
        title: user.title,
        points: user.points,
        status: user.status,
        dueDate: user.dueDate,
        priority: user.priority,
        _id: user._id.toString(),
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        description: user.description,
        reporter: toUserReporter(reporter)
    };
}
