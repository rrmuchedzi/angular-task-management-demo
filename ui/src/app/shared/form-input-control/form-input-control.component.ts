import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

@Component({
    selector: 'app-form-input-control',
    templateUrl: './form-input-control.component.html',
    styleUrls: ['./form-input-control.component.scss'],
})
export class FormInputControlComponent implements OnInit {
    @Input() title!: string;
    @Input() label!: string;
    @Input() required!: boolean;
    @Input() isTextArea!: boolean;
    @Input() description!: string;
    @Input() minCharacters!: number;
    @Input() maxCharacters!: number;
    @Input() type: string = 'text';
    @Input() showCounter: boolean = true;
    @Input() control!: UntypedFormControl;
    @Input() hideErrors: boolean = false;
    @Input() toLowerCase: boolean = false;

    @Input() placeholder: string = 'Add...';
    @Output() enterKeyUpEvent = new EventEmitter();

    @ViewChild('formInputTextArea') formInputTextArea!: ElementRef;

    controlHasFocus!: boolean;

    ngOnInit(): void {
        if (this.control == null) {
            throw new Error('Form control was not provided for the input component.')
        }
    }

    onEnterKeyUp() {
        this.enterKeyUpEvent.emit();
    }

    get isControlRequiredAndDirty() {
        return this.required || String(this.control.value).length > 0;
    }
}
