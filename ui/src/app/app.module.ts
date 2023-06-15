import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlatformServices } from './services/platform.service';
import { StorageServices } from './services/storage.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [StorageServices, PlatformServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
