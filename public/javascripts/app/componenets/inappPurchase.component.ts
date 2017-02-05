import {Component, NgZone} from '@angular/core';
import {PackagesService} from "../services/packages.service";
import * as _ from 'lodash';

@Component({
    templateUrl: 'templates/inapp-purchase.html',
    providers: [PackagesService]
})

export class InappPurchaseComponent {
    public disableBtns:boolean = false;
    public creditPlans;
    public callPlans;
    public didPlans;
    public selectedPackageId;
    public error;
    private plansLookup = {};

    constructor(
        private _ngZone: NgZone,
        private packagesService: PackagesService
    ){
        window['angularComponentRef'] = {
            component: this,
            zone: _ngZone,
            purchaseCallback: (value) => this.purchaseCallback(value),
        };
    }

    ngOnInit(): void {
        let self = this;
        this.packagesService.getPurchsablePackages()
            .subscribe(
                res => {
                    this.creditPlans = res.creditPlans;
                    this.callPlans = _.groupBy(res.callPlans,'category');
                    this.didPlans = res.didPlans;
                    let plansLookup;
                    _.each(res, function(plansAr){
                        plansLookup = _.keyBy(plansAr, 'id');
                        self.plansLookup = _.merge(self.plansLookup, plansLookup);
                    });
                });
    }

    ngOnDestroy() {
        window['angularComponentRef'] = null;
    }

    triggerInappPurchase($packageId):void {
        this.disableBtns = true;
        this.selectedPackageId = $packageId;
        this.packagesService.validatePackage(this.selectedPackageId)
            .subscribe(
                res => {
                    // console.log("COMPONENT RESPONSE: "+res.body.result.isValid+" message: "+res.body.result.message);
                    let message = res.body.result.message;
                    if(res.body.result.isValid === true) {
                        let productId = _.get(this.plansLookup[this.selectedPackageId], 'iosProductId');
                        if(productId){
                            window.location.href = "inapp://productid:" + productId;
                        } else {
                            this.error = 'missing product ID';
                        }

                    } else {
                        this.error = message;
                    }
                },
                res => {
                    this.disableBtns = true;
                }
            );

    }

    purchaseCallback(result):void {
        this.disableBtns = false;
    }

}