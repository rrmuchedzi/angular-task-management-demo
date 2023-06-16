/*
 * Copyright (C) 2023 TASKY - All Rights Reserved
 *
 * Authors:
 * Rickson Muchedzi - rrmuchedzi@gmail.com
 */

import { HttpStatus } from '../../api/utils/https';

/**
 * Default Error class
 *
 * Use this class to control how errors are being handled by the REST API.
 * It is basically the normal Error class, with the ability to control the HTTP Status code.
 */
export class StatusError extends Error {
    constructor(message: string, public status: HttpStatus, public body?: unknown) {
        super(message);
        this.name = this.constructor.name;
        this.status = status;
        this.body = body ?? { reason: message };
    }
}

export class ValidationError extends Error {
    constructor(message: string, public context: Record<string, unknown>) {
        super(message);
        this.name = this.constructor.name;
        this.context = context;
    }
}
/**
 * By throwing this error in a switch statement default case, TypeScript will warn against unhandled enum cases.
 */
export class UnreachableCaseError extends Error {
    constructor(val: any) {
        super(`Unreachable case: ${JSON.stringify(val, undefined, 2)}`);
    }
}
export class AggregateError extends Error {
    public errors: any[];
    constructor(errors: any[]) {
        const message = errors.map((val) => String(val)).join('\n');
        super(`Aggregated errors: \n${message}`);
        this.errors = errors;
    }
}
