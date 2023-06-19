import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServices } from '../services/auth.service';
import { UserServices } from '../services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AuthComponent {

  constructor(
    private _router: Router,
    private _user: UserServices,
    private _auth: AuthServices,
  ) { }


  get hasSessionVerification() {
    return this._auth.hasSessionVerification;
  }
}
