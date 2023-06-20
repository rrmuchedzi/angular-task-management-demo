import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BacklogComponent } from './backlog/backlog.component';
import { DashboardComponent } from './dashboard.component';
import { AuthGuardService } from '../guards/auth.guard';
import { DashboardRoutes } from './dashboard.routes';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: DashboardRoutes.Backlog,
        component: BacklogComponent
      },
      {
        path: '**',
        redirectTo: ''
      },
    ],
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
