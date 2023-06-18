import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../shared/snackbar/snackbar.component';
import { SnackbarResource, SnackbarTypes } from '../types';

@Injectable()
export class SnackbarService {
    constructor(private _snackbar: MatSnackBar) {}

    showSnackBarNotification(message: string, type: SnackbarTypes) {
        const data: SnackbarResource = {
            message,
            type,
        };
        this._snackbar.openFromComponent(SnackbarComponent, {
            duration: 8000,
            data,
        });
    }
}
