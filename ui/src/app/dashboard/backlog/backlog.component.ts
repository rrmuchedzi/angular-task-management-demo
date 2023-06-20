import { Component, OnInit } from '@angular/core';
import { memoize } from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { TaskServices } from 'src/app/services/task.service';
import { TaskEditorComponent } from '../common/task-editor/task-editor.component';
import { TaskPriority, TaskStatus } from '../../../../../api/constants';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnInit {
  selectedFilterOption!: string;

  filterOptions: string[] = [
    'Show All',
    ...Object.values(TaskStatus),
  ]
  selectedTasks: { [key: string]: boolean } = {};

  constructor(private _task: TaskServices, private _dialog: MatDialog) { }

  ngOnInit(): void {
    this.selectedFilterOption = this.filterOptions[0];
  }

  handleFilterChange(status: string) {
    this.selectedFilterOption = status;
  }

  handleSelectTaskEvent(taskId: string) {
    this.selectedTasks[taskId] = this.selectedTasks[taskId] ? false : true;
  }

  handleEditTaskEvent(taskIndex: number) {
    this._dialog.open(TaskEditorComponent, { data: this.tasks[taskIndex] });
  }

  hasEventInProgress(taskId: string) {
    return this._task.hasTaskEvent(taskId);
  }

  handleChangeTaskStatusEvent(status: TaskStatus, taskId: string) {
    this._task.updateTaskStatus(taskId, status);
  }

  handleChangeTaskPriorityEvent(priority: TaskPriority, taskId: string) {
    this._task.updateTaskPriority(taskId, priority);
  }

  handleDeleteTaskEvent(taskId: string) {
    this._task.deleteTask(taskId);
  }

  isTaskSelected(taskId: string) {
    return this.selectedTasks[taskId];
  }

  get tasks() {
    if (this.filterOptions[0] === this.selectedFilterOption) {
      return this._task.tasks
    }

    return this._task.tasks.filter(({ status }) => status === this.selectedFilterOption);
  }
}
