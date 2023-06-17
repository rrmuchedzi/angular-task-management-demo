/*
 * Copyright (C) 2023 TASKY - All Rights Reserved
 *
 * Authors:
 * Rickson Muchedzi - https://muchedzi.com
 */

import { DocumentType, index, modelOptions, mongoose, pre, prop, Ref, Severity } from '@typegoose/typegoose';
import { UserResource, User as UserType } from '../../../api/types/user';
import { USER_NAME_LIMIT } from '../../../api/constants';
import { Organization, toOrganizationApiObject } from './organization';

@modelOptions({
    options: {
        allowMixed: Severity.ALLOW,
    },
})
@index({ email: 1 }, { unique: true, collation: { locale: 'en', strength: 2 } })
@pre<User>('save', function () {
    this.updatedAt = Date.now();
})
export class User implements UserType {
    @prop({ required: true, type: String, maxlength: USER_NAME_LIMIT })
    public name: string;

    @prop({ required: true, ref: () => Organization, type: () => mongoose.Schema.Types.ObjectId, default: [] })
    public organizations: Ref<Organization, ObjectIdType>[];

    @prop({ required: true, unique: true })
    public email: string;

    @prop({ required: true, select: false, type: String })
    public password: string;

    @prop({ required: true, unique: true, immutable: true, select: false, type: String })
    public passwordSalt: Readonly<string>;

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
export function toUserApiObject(user: DocumentType<User>): UserResource {
    return {
        name: user.name,
        email: user.email,
        _id: user._id.toString(),
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        organizations: user.organizations.map((organization) => toOrganizationApiObject(organization as DocumentType<Organization>))
    };
}

export function toUserReporter(user: DocumentType<User>): UserType {
    return {
        name: user.name,
        email: user.email,
    };
}
