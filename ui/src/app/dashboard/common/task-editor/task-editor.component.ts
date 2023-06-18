import { Component, Inject, OnInit } from '@angular/core';
import { v4 } from 'uuid';
import { UntypedFormControl, Validators } from '@angular/forms';
import { TASK_DESCRIPTION_LIMIT, TASK_TITLE_LIMIT, TaskPriority, TaskStatus } from '../../../../../../api/constants';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task, TaskResource } from '../../../../../../api/types/task';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { SnackbarTypes } from 'src/app/types';
import { TaskServices } from 'src/app/services/task.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-editor',
  templateUrl: './task-editor.component.html',
  styleUrls: ['./task-editor.component.scss']
})
export class TaskEditorComponent implements OnInit {
  private _taskContent!: Task;
  isSavingResource: boolean = false;
  titleFormControl!: UntypedFormControl;
  descriptionFormControl!: UntypedFormControl;

  readonly taskStatusOptions = Object.values(TaskStatus);
  readonly taskPriorityOptions = Object.values(TaskPriority);

  inEditMode: boolean = false;

  readonly TASK_TITLE_LIMIT = TASK_TITLE_LIMIT;
  readonly TASK_DESCRIPTION_LIMIT = TASK_DESCRIPTION_LIMIT;

  // Task editor subscriptions and reference.
  private readonly EDITOR_REFERENCE = v4();
  private _taskCreatorSubscription!: Subscription;

  constructor(
    private _task: TaskServices,
    private _snackbar: SnackbarService,
    public dialogRef: MatDialogRef<TaskEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: TaskResource,
  ) { }

  ngOnInit(): void {
    // Initialize task resource.
    this._taskContent = this.data ?? this.defaultTask;
    this.inEditMode = this.data != null;

    this._initTaskFormControls();
    this._initCreatorSubscriptions();
  }

  get defaultTask(): Task {
    return {
      title: '',
      description: '',
      status: TaskStatus.ToDo,
      points: 2, priority: TaskPriority.Normal,
    }
  }

  onSetTaskStatus(status: string) {
    this._taskContent.status = status as TaskStatus;
  }

  onSetTaskPriority(priority: string) {
    this._taskContent.priority = priority as TaskPriority;
  }

  onSetTaskPoints(points: number) {
    this._taskContent.points = points;
  }

  closeTaskCreator() {
    this._closeTaskEditor();
  }

  onSaveTask() {
    if (this.titleFormControl.invalid) {
      if (this.titleFormControl.errors?.['whitespaceOnlyExp']) {
        this.titleFormControl.setValue('');
      }
      return this._snackbar.showSnackBarNotification(
        `Title is required before ${this.inEditMode ? 'updating' : 'saving'} your task.`,
        SnackbarTypes.INFO,
      );
    }

    if (this.descriptionFormControl.invalid) {
      if (this.titleFormControl.errors?.['whitespaceOnlyExp']) {
        this.titleFormControl.setValue('');
      }
      return this._snackbar.showSnackBarNotification(
        `Description is required before ${this.inEditMode ? 'updating' : 'saving'} your task.`,
        SnackbarTypes.INFO,
      );
    }

    const task: Task = {
      ...this._taskContent,
      title: this.titleFormControl.value,
      description: this.descriptionFormControl.value,
    }

    if (this.inEditMode) {
      if (this.data == null) {
        return;
      }

      return this._task.updateTask({
        ...this.data,
        ...task,
      }, this.EDITOR_REFERENCE);
    }

    this._task.createTask(task, this.EDITOR_REFERENCE);
  }

  get taskPoints() {
    return this._taskContent.points;
  }

  get taskStatus() {
    return this._taskContent.status;
  }

  get taskPriority() {
    return this._taskContent.priority;
  }

  private _initCreatorSubscriptions() {
    this._taskCreatorSubscription = this._task.taskCreatorSubject.subscribe(
      ({ status, referenceId }) => {
        if (referenceId !== this.EDITOR_REFERENCE || !status) {
          this.isSavingResource = false;
          return;
        }

        this._closeTaskEditor();
      },
    );
  }

  private _closeTaskEditor = () => {
    this.dialogRef.close();
  };

  private _initTaskFormControls() {
    const { description, title } = this._taskContent;
    this.titleFormControl = new UntypedFormControl(
      title, [Validators.required, Validators.minLength(1), Validators.maxLength(TASK_TITLE_LIMIT)]
    );

    this.descriptionFormControl = new UntypedFormControl(
      description, [Validators.required, Validators.minLength(1), Validators.maxLength(TASK_DESCRIPTION_LIMIT)]
    );
  }
}
