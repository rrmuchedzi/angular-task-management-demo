/*
 * Copyright (C) 2023 TASKY - All Rights Reserved
 *
 * Authors:
 * Rickson Muchedzi - https://muchedzi.com
 */

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { UserServices } from './user.service';
import { StorageServices } from './storage.service';
import { Location } from '@angular/common';

export enum AuthRequestType {
    signIn = 'SIGN_IN',
    register = 'REGISTER',
}

@Injectable()
export class AuthServices {
    // Used to keep the state of the persistent user record saved locally.
    // If the user saved record has been looked for and found, auth guards can be used.
    private _authRequestSubject = new Subject<{ type: AuthRequestType; reason?: string }>();
    private _authVerificationStatusSubject = new Subject<{ status: boolean }>();

    // Password recovery observable to notify recover component when recovery email has been sent.
    recoveryNotificationSubject = new Subject();

    _disableResendingCode: boolean = false;

    // Auth service events to track server events status.
    // private _authServiceEvents: AuthServiceEvents = {
    //     hasLoginEvent: false,
    //     hasLogoutEvent: false,
    //     hasRecoveryEvent: false,
    //     hasOnBoardingEvent: false,
    //     hasRegistrationEvent: false,
    //     hasAccountVerification: false,
    //     hasSessionVerification: false,
    //     isResendingVerificationCode: false,
    // };

    constructor(
        private _router: Location,
        private _user: UserServices,
        private _storage: StorageServices,
        // private _snackbar: SnackbarService,
        // private _navigation: NavigationService,
    ) {}

    // async onUserLogin(body: LoginRequest) {
    //     try {
    //         // Ensure that there is no active account login in progress.
    //         if (this._authServiceEvents.hasLoginEvent) {
    //             return;
    //         }

    //         this._authServiceEvents.hasLoginEvent = true;
    //         this._user.user = await endpointFetch(LoginEndpoint, { scope: AUTH_MANAGER_PATH, body });

    //         this.redirectUserOnLogin();
    //     } catch (error) {
    //         this._storage.clearBrowserData();
    //         const { status } = await handleError(error, false);

    //         this._snackbar.showSnackBarNotification(
    //             status === HttpStatus.UNAUTHORIZED
    //                 ? `The login details that you've entered are incorrect. Please try again`
    //                 : 'There seems to be a network connection problem or a problem on our end. Please retry, and if the problem persists, contact support.',
    //             SnackbarTypes.ERROR,
    //         );
    //         this._authRequestSubject.next({ type: AuthRequestType.register, reason: error });
    //     }
    //     this._authServiceEvents.hasLoginEvent = false;
    // }

    // async registerUser(body: RegisterUser) {
    //     try {
    //         // Ensure that there is no active account registration in progress.
    //         if (this._authServiceEvents.hasRegistrationEvent) {
    //             return;
    //         }

    //         this._authServiceEvents.hasRegistrationEvent = true;

    //         const user = await endpointFetch(RegisterEndpoint, { scope: AUTH_MANAGER_PATH, body });

    //         this._user.user = user;
    //         this._navigation.changeNavigation(AuthRoutesMenus.AccountVerification);
    //     } catch (error) {
    //         const { reason } = await handleError(error, false);
    //         this._snackbar.showSnackBarNotification(reason, SnackbarTypes.ERROR);
    //         this._authRequestSubject.next({ type: AuthRequestType.register, reason: error });
    //     }

    //     this._authServiceEvents.hasRegistrationEvent = false;
    // }

    // async verifySessionValidity() {
    //     try {
    //         // Ensure that there is no active account registration in progress.
    //         // If there is no user cookie we assume the session was destroyed.
    //         // We don't check with the server if that's the case.
    //         if (this._authServiceEvents.hasSessionVerification || this._storage.getUserAuthData() == null) {
    //             if (this._redirectToLoginPage) {
    //                 this._navigation.changeNavigation(AuthRoutesMenus.Login);
    //             }
    //             return;
    //         }

    //         this._authServiceEvents.hasSessionVerification = true;

    //         this._user.user = await endpointFetch(VerifySessionEndpoint, { scope: AUTH_MANAGER_PATH });
    //         this._authVerificationStatusSubject.next({ status: true });
    //     } catch (error) {
    //         this._storage.deleteUserAuthData();
    //         this._authVerificationStatusSubject.next({ status: false });
    //         this.redirectUserOnLogin();
    //     }
    //     this._authServiceEvents.hasSessionVerification = false;
    // }

    async userLogoutHandler() {
        // if (this._authServiceEvents.hasLogoutEvent) {
        //     return;
        // }

        // this._authServiceEvents.hasLogoutEvent = true;

        // await endpointFetch(LogoutEndpoint, { scope: AUTH_MANAGER_PATH });
        this._storage.clearBrowserData();
    }

    // get hasLoginEvent() {
    //     return this._authServiceEvents.hasLoginEvent;
    // }

    // get hasRegistrationEvent() {
    //     return this._authServiceEvents.hasRegistrationEvent;
    // }

    // get hasAccountVerification() {
    //     return this._authServiceEvents.hasAccountVerification;
    // }

    // get hasSessionVerification() {
    //     return this._authServiceEvents.hasSessionVerification;
    // }

    // get isDashboardLoading() {
    //     return this._authServiceEvents.hasLogoutEvent || this._authServiceEvents.hasLoginEvent;
    // }
}
