import {Component, NgZone} from '@angular/core';

@Component({
    templateUrl: 'templates/inapp-purchase.html'
})

export class InappPurchaseComponent {
    disableBtns:boolean = false;

    constructor(private _ngZone: NgZone){
        window.angularComponentRef = {
            component: this,
            zone: _ngZone,
            purchaseCallback: (value) => this.purchaseCallback(value),
        };
    }

    ngOnDestroy() {
        window.angularComponent = null;
    }

    triggerInappPurchase():void {
        this.disableBtns = true;
        window.location.href = "productId:juanachat2_1usdcallphbucket";
    }

    purchaseCallback(result):void {
        this.disableBtns = false;
    }

}