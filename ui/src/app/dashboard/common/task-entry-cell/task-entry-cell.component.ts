import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskResource } from '../../../../../../api/types/task';
import { MatDialog } from '@angular/material/dialog';
import { TaskEditorComponent } from '../task-editor/task-editor.component';
import { TaskPriority, TaskStatus } from '../../../../../../api/constants';

@Component({
  selector: 'app-task-entry-cell',
  templateUrl: './task-entry-cell.component.html',
  styleUrls: ['./task-entry-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskEntryCellComponent {
  @Input() title!: string;
  @Input() selected!: boolean;
  @Input() status!: TaskStatus;
  @Input() priority!: TaskPriority;
  @Input() hasEventInProgress: boolean = false;

  @Output() onEditTaskEvent = new EventEmitter();
  @Output() onDeleteTaskEvent = new EventEmitter();
  @Output() onToggleTaskSelection = new EventEmitter();

  @Output() onChangeTaskStatus = new EventEmitter<TaskStatus>();
  @Output() onChangeTaskPriority = new EventEmitter<TaskPriority>();

  readonly taskStatus = TaskStatus;
  readonly taskPriority = TaskPriority;

  readonly statusOptions = Object.values(TaskStatus);
  readonly priorityOptions = Object.values(TaskPriority);

  onToggleTaskCheckbox() {
    this.onToggleTaskSelection.emit();
  }

  changeTaskStatus(index: number) {
    console.log('Changing Status: ', this.statusOptions[index]);
    this.onChangeTaskStatus.emit(this.statusOptions[index]);
  }

  changeTaskPriority(index: number) {
    console.log('Changing Priority');
    this.onChangeTaskPriority.emit(this.priorityOptions[index]);
  }

  onEditTask() {
    this.onEditTaskEvent.emit();
  }

  onDeleteTask() {
    this.onDeleteTaskEvent.emit();
  }
}
