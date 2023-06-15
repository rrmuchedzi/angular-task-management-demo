import { Injectable, isDevMode } from '@angular/core';
import { StorageServices } from './storage.service';
import { PlatformTheme } from '../types';

@Injectable()
export class PlatformServices {
    private _platformTheme: PlatformTheme;

    constructor(private _storage: StorageServices) {
        this._platformTheme = this._storage.getPlatformThemeData();
    }

    changePlatformTheme(selectedTheme: PlatformTheme) {
        this._storage.savePlatformThemeData(selectedTheme);
        this._platformTheme = selectedTheme;
    }

    get platformTheme() {
        return this._platformTheme;
    }

    get isUsingLightTheme() {
        return this._platformTheme === PlatformTheme.Light;
    }
}
