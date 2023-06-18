import { DOCUMENT } from '@angular/common';
import { Component, Inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { AuthServices } from 'src/app/services/auth.service';
import { PlatformServices } from 'src/app/services/platform.service';
import { UserServices } from 'src/app/services/user.service';
import { PlatformTheme } from 'src/app/types';

@Component({
    selector: 'app-user-profile-menu',
    templateUrl: './user-profile-menu.component.html',
    styleUrls: ['./user-profile-menu.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class UserProfileMenuComponent {
    isProfileOpen: boolean = false;
    // readonly customerSupportType = CustomerSupportType;

    @ViewChild('userSettingsMenuTrigger') userSettingsTrigger!: MatMenuTrigger;

    constructor(
        private _user: UserServices,
        private _auth: AuthServices,
        private _platform: PlatformServices,
        @Inject(DOCUMENT) private _document: Document,
    ) { }

    onLogoutHandler() {
        this._auth.userLogoutHandler();
    }

    toggleIsProfileOpen(status: boolean) {
        this.isProfileOpen = status;
    }

    onOpenAccountSettings() {
        // this._navigation.changeNavigation(`/dashboard/account`);
        // this._navigation.selectedMenu = DashboardRoutesMenus.Account;
        this.userSettingsTrigger.closeMenu();
    }

    onTogglePlatformTheme() {
        const selectedTheme = this.isUsingLightTheme ? PlatformTheme.Dark : PlatformTheme.Light;
        const currentThemeClass = this._platform.isUsingLightTheme ? PlatformTheme.Light : PlatformTheme.Dark;

        this._platform.changePlatformTheme(selectedTheme);
        this._document.body.classList.replace(currentThemeClass, selectedTheme);
        this.userSettingsTrigger.closeMenu();
    }

    get isUsingLightTheme() {
        return this._platform.isUsingLightTheme;
    }

    get userNameInitials() {
        return this._user.userNameInitials;
    }
}
