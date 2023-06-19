import { Component } from '@angular/core';
import { FormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import {
    PASSWORD_MAX_CHARACTERS,
    PASSWORD_MIN_CHARACTERS,
    USER_NAME_LIMIT,
} from '../../../../../api/constants';
import { AuthServices } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { SnackbarTypes } from 'src/app/types';
import { whitespaceOnlyValidator } from 'src/app/types/validator';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
})
export class RegisterComponent {
    readonly USER_NAME_LIMIT = USER_NAME_LIMIT;

    readonly PASSWORD_MAX_CHARACTERS = PASSWORD_MAX_CHARACTERS;
    readonly PASSWORD_MIN_CHARACTERS = PASSWORD_MIN_CHARACTERS;

    emailFormControl: UntypedFormControl = new UntypedFormControl('',
        [
            Validators.email,
            Validators.required
        ],);

    nameFormControl: UntypedFormControl = new UntypedFormControl('',
        [
            Validators.required,
            Validators.minLength(1),
            whitespaceOnlyValidator(),
            Validators.maxLength(USER_NAME_LIMIT),
        ]);

    passwordFormControl: UntypedFormControl = new UntypedFormControl('',
        [
            Validators.required,
            Validators.minLength(PASSWORD_MIN_CHARACTERS),
            Validators.maxLength(PASSWORD_MAX_CHARACTERS),
        ]);

    constructor(private _auth: AuthServices, private _formBuilder: FormBuilder, private _snackbar: SnackbarService) {
    }

    onRegisterUser() {
        if (this.hasRegistrationEvent) {
            return this._snackbar.showSnackBarNotification(
                'Another account registration is in progress. Please wait for it to complete.',
                SnackbarTypes.INFO,
            );
        }

        // Validate the email address provided.
        if (this.emailFormControl.invalid) {
            if (this.emailFormControl.errors?.['whitespaceOnlyExp']) {
                this.emailFormControl.setValue('');
            }

            return this._snackbar.showSnackBarNotification(
                'Please provide a valid email address to complete your account registration.',
                SnackbarTypes.INFO,
            );
        }

        // Validate the password provided.
        if (this.nameFormControl.invalid) {
            if (this.nameFormControl.errors?.['whitespaceOnlyExp']) {
                this.nameFormControl.setValue('');
            }

            return this._snackbar.showSnackBarNotification(
                `Please provide your full name to complete your account registration. 
                You full name can have between 1 and ${USER_NAME_LIMIT} characters.`,
                SnackbarTypes.INFO,
            );
        }

        // Validate the password provided.
        if (this.passwordFormControl.invalid) {
            return this._snackbar.showSnackBarNotification(
                `Please provide a valid password to complete your account registration. 
                Your password can have between ${PASSWORD_MIN_CHARACTERS} and ${PASSWORD_MAX_CHARACTERS} characters.`,
                SnackbarTypes.INFO,
            );
        }

        this._auth.registerUser({
            password: this.passwordFormControl.value,
            name: String(this.nameFormControl.value).trim(),
            email: String(this.emailFormControl.value).trim(),
        });
    }

    get hasRegistrationEvent() {
        return this._auth.hasRegistrationEvent;
    }
}
