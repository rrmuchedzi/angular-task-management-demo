import { Component, Input } from '@angular/core';
import { TaskResource } from '../../../../../../api/types/task';
import { MatDialog } from '@angular/material/dialog';
import { TaskEditorComponent } from '../task-editor/task-editor.component';

@Component({
  selector: 'app-task-entry-cell',
  templateUrl: './task-entry-cell.component.html',
})
export class TaskEntryCellComponent {
  @Input() task!: TaskResource;

  constructor(private _dialog: MatDialog) {

  }

  onToggleTaskCheckbox() {

  }

  onEditTask() {
    this._dialog.open(TaskEditorComponent, { data: this.task });
  }
}
