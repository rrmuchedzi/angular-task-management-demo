import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewEncapsulation,
} from '@angular/core';

@Component({
    selector: 'app-menu-selector',
    templateUrl: './menu-selector.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuSelectorComponent implements OnInit {
    @Input() selected?: string;
    @Input() options: string[] = [];
    @Input() label: string = 'Options';
    @Input() disableIndexes: number[] = [];
    @Output() selectOptionEvent = new EventEmitter<string>();

    isMenuOpened: boolean = false;

    ngOnInit(): void {
        if (this.options.length === 0) {
            throw new Error('Menu selector requires 1 or more options.');
        }
    }

    selectLinkOption(selectedIndex: number) {
        if (this.selected === this.options[selectedIndex] || this.disableIndexes.includes(selectedIndex)) {
            return;
        }
        this.selectOptionEvent.emit(this.options[selectedIndex]);
    }

    menuClosed() {
        this.isMenuOpened = false;
    }

    menuOpened() {
        this.isMenuOpened = true;
    }
}
