import { Injectable, isDevMode } from '@angular/core';
import { StorageServices } from './storage.service';
import { PlatformTheme, TaskCreatorEvent } from '../types';
import { Task, TaskResource } from '../../../../api/types/task';
import { Subject } from 'rxjs';

@Injectable()
export class TaskServices {
    private _tasks: TaskResource[] = [];

    // Broadcaster task creation events.
    taskCreatorSubject = new Subject<TaskCreatorEvent>();

    createTask(body: Task, referenceId: string) {

    }

    updateTask(body: TaskResource, referenceId: string) {

    }

    updateTaskStatus(body: TaskResource, referenceId: string) {

    }

    deleteTask(taskIds: string[]) {

    }

    get tasks() {
        return this._tasks;
    }
}
