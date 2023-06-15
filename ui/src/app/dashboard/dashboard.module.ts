import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { BacklogComponent } from './backlog/backlog.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ManagerComponent } from './manager/manager.component';


@NgModule({
  declarations: [
    DashboardComponent,
    BacklogComponent,
    ManagerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
  ]
})
export class DashboardModule { }
