import { Component, OnInit } from '@angular/core';
import { TaskServices } from '../services/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private _task: TaskServices) { }

  ngOnInit(): void {
    this._task.getTasks();
  }
}
