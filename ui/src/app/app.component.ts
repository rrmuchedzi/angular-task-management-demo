import { Component, Inject, Renderer2 } from '@angular/core';
import { PlatformServices } from './services/platform.service';
import { DOCUMENT } from '@angular/common';
import { PlatformTheme } from './types';
import { AuthServices } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private _auth: AuthServices,
    private _renderer: Renderer2,
    private _platform: PlatformServices,
    @Inject(DOCUMENT) private _document: Document,
  ) { }

  ngOnInit(): void {
    this._initPlatformTheme();
    this._auth.verifySessionValidity();
  }

  private _initPlatformTheme() {
    this._renderer.addClass(
      this._document.body,
      this._platform.platformTheme,
    );
  }
}
