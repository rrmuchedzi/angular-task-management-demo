/*
 * Copyright (C) 2023 TASKY - All Rights Reserved
 *
 * Authors:
 * Rickson Muchedzi - https://muchedzi.com
 *
 * Description:
 * Export all entities to avoid TypeScript running into circular import problems.
 * These problems can otherwise easily surface because each entity file tends to import many other entity files or a shared base entity.
 *
 * To avoid future circular imports stemming from entities we must always import entities from this index, i.e., the entities folder.
 */

export * from './user';
export * from './task';
export * from './organization';
