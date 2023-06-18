import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-creator-header',
    templateUrl: './creator-header.component.html',
    styleUrls: ['./creator-header.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class CreatorHeaderComponent {
    @Input() iconSelector?: string;
    @Input() title: string = 'Dialog';
}
