import {Component, Output, EventEmitter} from '@angular/core';
@Component({
    selector: 'paypal-button',
    template: `<button (click)="onClick()" [disabled]=disabled class="btn paypal-btn">
                    Pay via <img class="paypal-btn-logo" src="https://www.paypalobjects.com/webstatic/i/logo/rebrand/ppcom.svg" />
               </button>
               <span class="paypal-btn-spinner-wrapper"><simple-spinner [show]="isProcessing"></simple-spinner></span>`,
    inputs: ['disabled','isProcessing']
})
export class PaypalButtonComponent  {
    public disabled: boolean = false;
    public isProcessing: boolean = false;
    @Output() ButtonClicked = new EventEmitter();

    constructor(){}


    onClick():void {
        //this.isProcessing = true;
        this.disabled = true;
        this.ButtonClicked.emit()
    }

}