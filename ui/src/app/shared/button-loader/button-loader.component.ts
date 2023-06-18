import { Component } from '@angular/core';

@Component({
    selector: 'app-button-loader',
    template: '<div class="btn-loader"></div>',
    styles: [
        `
            .btn-loader {
                width: 15px;
                height: 15px;
                border: 2px solid;
                border-radius: 50%;
                position: relative;
                color: currentColor;
                display: inline-block;
                border-top-color: transparent;
                animation: rotate 1s linear infinite;
            }

            @keyframes rotate {
                0% {
                    transform: rotate(0);
                }
                100% {
                    transform: rotate(360deg);
                }
            }
        `,
    ],
})
export class ButtonLoaderComponent {}
