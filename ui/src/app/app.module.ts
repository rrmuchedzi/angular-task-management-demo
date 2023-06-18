import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlatformServices } from './services/platform.service';
import { StorageServices } from './services/storage.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthServices } from './services/auth.service';
import { UserServices } from './services/user.service';
import { SnackbarService } from './services/snackbar.service';
import { SharedModule } from './shared/shared.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    MatSnackBarModule,
    BrowserAnimationsModule
  ],
  providers: [AuthServices, UserServices, StorageServices, SnackbarService, PlatformServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
