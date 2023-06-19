/*
 * Copyright (C) 2023 TASKY - All Rights Reserved
 *
 * Authors:
 * Rickson Muchedzi - https://muchedzi.com
 */

import { Injectable } from '@angular/core';
import { UserServices } from '../services/user.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthServices } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
    constructor(private _auth: AuthServices, private _user: UserServices, private _router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this._auth.hasFetchedSavedUser) {
            return this.getUserAuthStatus();
        } else {
            return new Observable<boolean>((obs) => {
                return this._auth.authVerificationStatusSubject.subscribe(() => {
                    obs.next(this.getUserAuthStatus());
                });
            });
        }
    }

    getUserAuthStatus = (): boolean => {
        if (this._user.isUserProfileReady) {
            return true;
        }

        this._router.navigate(['/login']);
        return false;
    };
}
