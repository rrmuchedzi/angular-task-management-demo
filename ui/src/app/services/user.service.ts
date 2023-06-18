/*
 * Copyright (C) 2023 TASKY - All Rights Reserved
 *
 * Authors:
 * Rickson Muchedzi - https://muchedzi.com
 */

import { Injectable } from '@angular/core';
import { UserResource } from '../../../../api/types/user';

@Injectable()
export class UserServices {
    userNameInitials: string = '';
    private _user: UserResource | null = null;

    // async updateUserAccountInformation(body: UserInformationUpdate, referenceId: string) {
    //     try {
    //         // We should not send an update request when there is another active update.
    //         if (this._userUpdateEvents.accountInformation) {
    //             return;
    //         }

    //         this._userUpdateEvents.accountInformation = true;
    //         await endpointFetch(UpdateUserInformationEndpoint, {
    //             scope: USER_MANAGER_PATH,
    //             body,
    //         });

    //         this._user.bio = body.bio;
    //         this._user.fullname = body.fullname;
    //         this._user.title = body.title;
    //         this._user.country = body.country;
    //         this._userAccountChangesSubject.next();
    //         this._userAccountUpdateSubject.next({ referenceId, status: true });
    //     } catch (error) {
    //         const { reason } = await handleError(error);
    //         this._userAccountUpdateSubject.next({ referenceId, status: false });
    //         this._snackbar.showSnackBarNotification(`${reason} ${HELP_ERROR_MESSAGE}`, SnackbarTypes.ERROR);
    //     }
    //     this._userUpdateEvents.accountInformation = false;
    // }

    // async updateUserAccountPassword(body: PasswordUpdate, referenceId: string) {
    //     try {
    //         // We should not send an update request when there is another active update.
    //         if (this._userUpdateEvents.password) {
    //             return;
    //         }

    //         this._userUpdateEvents.password = true;
    //         await endpointFetch(UpdateUserPasswordEndpoint, {
    //             scope: USER_MANAGER_PATH,
    //             body,
    //         });

    //         this._userAccountUpdateSubject.next({ referenceId, status: true });
    //     } catch (error) {
    //         const { reason } = await handleError(error);
    //         this._userAccountUpdateSubject.next({ referenceId, status: false });
    //         this._snackbar.showSnackBarNotification(`${reason} ${HELP_ERROR_MESSAGE}`, SnackbarTypes.ERROR);
    //     }
    //     this._userUpdateEvents.password = false;
    // }

    set user(value: UserResource) {
        this._user = value;
        this._generateUserInitials();
    }

    get name() {
        return this._user?.name;
    }

    get isUserProfileReady() {
        return this?._user != null;
    }

    private _generateUserInitials() {
        let initials = '';
        const nameParts = (this._user?.name ?? 'User').split(' ');

        if (nameParts.length === 1) {
            // If only one name is provided, return the first character
            initials = nameParts[0].charAt(0);
        } else {
            // If multiple names are provided, concatenate the initials
            initials = nameParts
                .filter((part) => part !== '')
                .map((part) => part.charAt(0))
                .join('');

            initials = initials.substring(0, 2);
        }

        this.userNameInitials = initials.substring(0, 2);
    }
}
