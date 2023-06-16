import { Component, Inject, Renderer2 } from '@angular/core';
import { PlatformServices } from './services/platform.service';
import { DOCUMENT } from '@angular/common';
import { PlatformTheme } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private _renderer: Renderer2,
    private _platform: PlatformServices,
    @Inject(DOCUMENT) private _document: Document,
  ) { }

  ngOnInit(): void {
    this._initPlatformTheme();
    // TODO: Enable session validity when auth is ready.
    // this._auth.verifySessionValidity();
  }

  private _initPlatformTheme() {
    console.log('Theme added: ', this._platform.platformTheme)
    this._renderer.addClass(
      this._document.body,
      this._platform.platformTheme,
    );
  }
}
