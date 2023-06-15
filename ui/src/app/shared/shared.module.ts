import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablerIconsModule } from 'angular-tabler-icons';
import * as icons from 'angular-tabler-icons/icons';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { TablerIconRendererComponent } from './tabler-icon-renderer/tabler-icon-renderer.component';

const components = [
  CheckboxComponent, TablerIconRendererComponent
]

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    TablerIconsModule.pick(icons),
  ],
  exports: components
})
export class SharedModule { }
