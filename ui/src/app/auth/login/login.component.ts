import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import {
    PASSWORD_MAX_CHARACTERS,
    PASSWORD_MIN_CHARACTERS,
} from '../../../../../api/constants';
import { AuthServices } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { SnackbarTypes } from 'src/app/types';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
    emailFormControl: UntypedFormControl = new UntypedFormControl('',
        [
            Validators.email,
            Validators.required
        ],);

    passwordFormControl: UntypedFormControl = new UntypedFormControl('',
        [
            Validators.required,
            Validators.minLength(PASSWORD_MIN_CHARACTERS),
            Validators.maxLength(PASSWORD_MAX_CHARACTERS),
        ]);

    constructor(private _auth: AuthServices, private _formBuilder: FormBuilder, private _snackbar: SnackbarService) { }

    onLoginUser() {
        // Validate the email provided.
        if (this.emailFormControl!.invalid) {
            return this._snackbar.showSnackBarNotification(
                'Enter your account email to log in.',
                SnackbarTypes.INFO,
            );
        }

        // Validate the password provided.
        if (this.passwordFormControl!.invalid) {
            return this._snackbar.showSnackBarNotification(
                'Enter your account password to log in.',
                SnackbarTypes.INFO,
            );
        }

        this._auth.onUserLogin({
            email: this.emailFormControl.value,
            password: this.passwordFormControl.value,
        });
    }

    get hasLoginEvent() {
        return this._auth.hasLoginEvent;
    }
}
