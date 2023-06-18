import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablerIconsModule } from 'angular-tabler-icons';
import * as icons from 'angular-tabler-icons/icons';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { FormInputControlComponent } from './form-input-control/form-input-control.component';
import { TablerIconRendererComponent } from './tabler-icon-renderer/tabler-icon-renderer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonLoaderComponent } from './button-loader/button-loader.component';
import { LoaderComponent } from './loader/loader.component';
import { CreatorHeaderComponent } from './creator-header/creator-header.component';

const components = [
  CheckboxComponent, TablerIconRendererComponent,
  FormInputControlComponent,
  ButtonLoaderComponent,
  LoaderComponent,
  CreatorHeaderComponent,
]

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(icons),
  ],
  exports: components
})
export class SharedModule { }
