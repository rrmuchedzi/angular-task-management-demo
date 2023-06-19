/*
 * Copyright (C) 2023 TASKY - All Rights Reserved
 *
 * Authors:
 * Rickson Muchedzi - https://muchedzi.com
 */

import { addModelToTypegoose, buildSchema, DocumentType, index, modelOptions, mongoose, pre, prop, Ref, Severity } from '@typegoose/typegoose';
import { UserResource, User as UserType } from '../../../api/types/user';
import { USER_NAME_LIMIT } from '../../../api/constants';
import { StatusError } from '../../../api/utils/error';
import { HttpStatus } from '../../../api/utils/https';

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

const UserSchema = buildSchema(User);
export const UserModel = addModelToTypegoose(mongoose.model('User', UserSchema), User);

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
    };
}

export function toUserReporter(user: DocumentType<User>): UserType {
    return {
        name: user.name,
        email: user.email,
    };
}


export async function findUserOrFail(userId: ObjectIdType) {
    const user = await UserModel.findById(userId);
    if (user == null) {
        throw new StatusError(
            'This account is not available. If you think there is a problem, please try again.',
            HttpStatus.NOT_FOUND,
        );
    }

    return user;
}