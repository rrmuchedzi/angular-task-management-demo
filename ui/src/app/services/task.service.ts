import { Injectable } from '@angular/core';
import { TaskEvents, SnackbarTypes, TaskCreatorEvent, TaskServiceEvents, TaskEventType } from '../types';
import { Task, TaskResource } from '../../../../api/types/task';
import { Subject } from 'rxjs';
import { SnackbarService } from './snackbar.service';
import { handleError } from '../tools/error';
import { FetchError, endpointFetch } from '../tools/fetch';
import { TASK_MANAGER_PATH } from '../../../../api/endpoints';
import { CreateTaskEndpoint, DeleteTaskEndpoint, GetTasksEndpoint, UpdateTaskEndpoint, UpdateTaskPriorityEndpoint, UpdateTaskStatusEndpoint } from '../../../../api/endpoints/task';
import { TaskPriority, TaskStatus } from '../../../../api/constants';

@Injectable()
export class TaskServices {
    private _tasks: TaskResource[] = [];

    // Used to track events for each specific task. If an id of
    // task exists, the task will have an event in progress and other
    // events will have to be put on hold until the current one completes.
    private _taskEvents: TaskEvents = {};

    // Broadcaster task creation events.
    taskCreatorSubject = new Subject<TaskCreatorEvent>();

    // Auth service events to track server events status.
    private _taskServiceEvents: TaskServiceEvents = {
        fetchingTasks: false,
    };

    constructor(private _snackbar: SnackbarService) { }

    async getTasks() {
        try {
            // Ensure that there is no active related request before emitting another.
            if (this._taskServiceEvents.fetchingTasks) {
                return;
            }

            this._taskServiceEvents.fetchingTasks = true;
            this._tasks = await endpointFetch(GetTasksEndpoint, { scope: TASK_MANAGER_PATH });
        } catch (error) {
            const { reason } = await handleError(error as FetchError, false);
            this._snackbar.showSnackBarNotification(
                reason,
                SnackbarTypes.ERROR,
            );
        }
        this._taskServiceEvents.fetchingTasks = false;
    }

    async createTask(body: Task, referenceId: string) {
        try {
            const taskResource = await endpointFetch(CreateTaskEndpoint, {
                scope: TASK_MANAGER_PATH,
                body,
            });

            this._tasks.push(taskResource);
            // Notify task creator modal of creation status.
            this.taskCreatorSubject.next({ status: true, referenceId });
        } catch (error) {
            const { reason } = await handleError(error as FetchError);
            this._snackbar.showSnackBarNotification(reason, SnackbarTypes.ERROR);
            this.taskCreatorSubject.next({ status: false, referenceId });
        }
    }

    async updateTask(body: TaskResource, referenceId: string) {
        // Return if the task has an event in progress.
        if (this._taskEvents[body._id]) {
            return;
        }

        try {
            const updatedTask = await endpointFetch(UpdateTaskEndpoint, {
                scope: TASK_MANAGER_PATH,
                body,
            });

            this._taskEvents[body._id] = TaskEventType.Update;
            this._updateTask(updatedTask);
            // Notify task creator modal of creation status.
            this.taskCreatorSubject.next({ status: true, referenceId });
        } catch (error) {
            const { reason } = await handleError(error as FetchError);
            this._snackbar.showSnackBarNotification(reason, SnackbarTypes.ERROR);
            this.taskCreatorSubject.next({ status: false, referenceId });
        }
        // Remove task event tracker.
        delete this._taskEvents[body._id];
    }

    async updateTaskStatus(taskId: string, status: TaskStatus) {
        try {
            // Return if the task has an event in progress.
            if (this._taskEvents[taskId]) {
                return;
            }

            this._taskEvents[taskId] = TaskEventType.StatusUpdate;
            const updatedTask = await endpointFetch(UpdateTaskStatusEndpoint, {
                scope: TASK_MANAGER_PATH,
                body: {
                    status,
                },
                params: {
                    taskId
                }
            });

            this._updateTask(updatedTask);
        } catch (error) {
            const { reason } = await handleError(error as FetchError);
            this._snackbar.showSnackBarNotification(reason, SnackbarTypes.ERROR);
        }
        // Remove task event tracker.
        delete this._taskEvents[taskId];
    }

    async updateTaskPriority(taskId: string, priority: TaskPriority) {
        try {
            // Return if the task has an event in progress.
            if (this._taskEvents[taskId]) {
                return;
            }

            this._taskEvents[taskId] = TaskEventType.StatusUpdate;
            const updatedTask = await endpointFetch(UpdateTaskPriorityEndpoint, {
                scope: TASK_MANAGER_PATH,
                body: {
                    priority,
                },
                params: {
                    taskId
                }
            });
            this._updateTask(updatedTask);
        } catch (error) {
            const { reason } = await handleError(error as FetchError);
            this._snackbar.showSnackBarNotification(reason, SnackbarTypes.ERROR);
        }
        // Remove task event tracker.
        delete this._taskEvents[taskId];
    }

    async deleteTask(taskId: string,) {
        try {
            // Return if the task has an event in progress.
            if (this._taskEvents[taskId]) {
                return;
            }

            this._taskEvents[taskId] = TaskEventType.Delete;
            await endpointFetch(DeleteTaskEndpoint, {
                scope: TASK_MANAGER_PATH,
                params: {
                    taskId
                }
            });
            const taskIndex = this._getTaskIndex(taskId);
            if (taskIndex !== -1) {
                this._tasks.splice(taskIndex, 1);
            }
        } catch (error) {
            const { reason } = await handleError(error as FetchError);
            this._snackbar.showSnackBarNotification(reason, SnackbarTypes.ERROR);
        }
        // Remove task event tracker.
        delete this._taskEvents[taskId];
    }

    hasTaskEvent(taskId: string) {
        return this._taskEvents[taskId] != null;
    }

    get tasks() {
        return this._tasks;
    }

    private _updateTask(task: TaskResource) {
        const taskIndex = this._getTaskIndex(task._id);
        if (taskIndex === -1) {
            return;
        }

        this._tasks[taskIndex] = task;
    }

    private _getTaskIndex(taskId: string) {
        return this._tasks.findIndex(({ _id }) => _id === taskId);
    }
}
