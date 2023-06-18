import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DashboardRoutes } from '../../dashboard.routes';
import { TaskEditorComponent } from '../task-editor/task-editor.component';
import { fullScreenMobileDialogConfig } from 'src/app/tools/dialog';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  readonly dashboardRoutes = DashboardRoutes;

  constructor(private _dialog: MatDialog) {

  }

  onCreateTask() {
    this._dialog.open(TaskEditorComponent, {
      ...fullScreenMobileDialogConfig
    });
  }
}
