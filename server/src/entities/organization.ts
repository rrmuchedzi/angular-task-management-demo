/*
 * Copyright (C) 2023 TASKY - All Rights Reserved
 *
 * Authors:
 * Rickson Muchedzi - https://muchedzi.com
 */

import { DocumentType, index, modelOptions, mongoose, pre, prop, Ref, Severity } from '@typegoose/typegoose';
import { OrganizationResource, Organization as OrganizationType } from '../../../api/types/organization';
import { ORGANIZATION_DESCRIPTION_LIMIT, ORGANIZATION_NAME_LIMIT, USER_NAME_LIMIT } from '../../../api/constants';

@modelOptions({
    options: {
        allowMixed: Severity.ALLOW,
    },
})
@index({ name: 1 }, { unique: true })
@pre<Organization>('save', function () {
    this.updatedAt = Date.now();
})
export class Organization implements OrganizationType {
    @prop({ required: true, unique: true, type: String, minlength: '', maxlength: ORGANIZATION_NAME_LIMIT })
    public name: string;

    @prop({ required: true, default: '', type: String, maxlength: ORGANIZATION_DESCRIPTION_LIMIT })
    public description: string;

    @prop({ required: true, ref: () => Organization, type: () => mongoose.Schema.Types.ObjectId, default: [] })
    public tasks: Ref<Organization, ObjectIdType>[];

    @prop({ required: true, type: mongoose.Schema.Types.ObjectId, immutable: true })
    public creatorId: ObjectIdType;

    @prop({ required: true, type: Number, immutable: true, default: Date.now() })
    public createdAt: number;

    @prop({ required: true, type: Number, default: Date.now() })
    public updatedAt: number;
}

/**
 * Converts the provided user database document to a user api resource.
 *
 * @param organization user database record.
 */
export function toOrganizationApiObject(organization: DocumentType<Organization>): OrganizationResource {
    return {
        name: organization.name,
        _id: organization._id.toString(),
        createdAt: organization.createdAt,
        updatedAt: organization.updatedAt,
        description: organization.description,
    };
}
