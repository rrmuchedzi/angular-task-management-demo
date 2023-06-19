import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { DashboardComponent } from './dashboard.component';
import { BacklogComponent } from './backlog/backlog.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ManagerComponent } from './manager/manager.component';
import { NavigationComponent } from './common/navigation/navigation.component';
import { UserProfileMenuComponent } from './common/user-profile-menu/user-profile-menu.component';
import { TaskEditorComponent } from './common/task-editor/task-editor.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TaskServices } from '../services/task.service';
import { TaskEntryCellComponent } from './common/task-entry-cell/task-entry-cell.component';

@NgModule({
  declarations: [
    DashboardComponent,
    BacklogComponent,
    ManagerComponent,
    NavigationComponent,
    UserProfileMenuComponent,
    TaskEditorComponent,
    TaskEntryCellComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatMenuModule,
    MatDialogModule,
    DashboardRoutingModule,
  ],
  providers: [
    TaskServices
  ]
})
export class DashboardModule { }
