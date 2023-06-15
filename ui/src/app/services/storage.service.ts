import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { PlatformTheme } from '../types';

@Injectable({
    providedIn: 'root',
})
export class StorageServices {
    authVerificationSubject = new Subject();
    private readonly _platformThemePersistedData = 'persist-theme';

    constructor(private _cookieService: CookieService) { }

    savePlatformThemeData(selectedTheme: PlatformTheme) {
        try {
            localStorage.setItem(this._platformThemePersistedData, selectedTheme);
        } catch (error) {
            //    TODO: Use snack bar here.
            console.error('Error: ', error);
        }
    }

    getPlatformThemeData() {
        const savedTheme = localStorage.getItem(this._platformThemePersistedData) as PlatformTheme;
        return savedTheme || PlatformTheme.Light;
    }

    clearBrowserData() {
        localStorage.clear();
        sessionStorage.clear();
        this._cookieService.deleteAll('/connect.sid');
    }
}
