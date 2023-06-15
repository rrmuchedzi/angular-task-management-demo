import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-tabler-icon-renderer',
    template: `<ng-container *ngIf="selector"><i-tabler [name]="selector"></i-tabler></ng-container>`,
})
export class TablerIconRendererComponent {
    @Input() selector: string | undefined;
}
