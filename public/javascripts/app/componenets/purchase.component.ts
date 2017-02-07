import * as _ from 'lodash';

import {Component, OnInit} from '@angular/core';
import {PackagesService} from "../services/packages.service";
import {PaypalService} from "../services/paypal.service";
import {CommonUtils} from "../utils/commonUtils";
import {Router, ActivatedRoute} from '@angular/router';

@Component({
    templateUrl: 'templates/purchase.html',
    providers: [PackagesService]
})

export class PurchaseComponent implements OnInit{
    creditPlans;
    callPlans;
    didPlans;
    selectedPackageId;
    disableBtns = true;
    isProcessing = false;

    constructor(
        private packagesService: PackagesService,
        private paypalService: PaypalService,
        private router: Router
    ){}

    ngOnInit(): void {
        this.packagesService.getPurchsablePackages()
            .subscribe(
                res => {
                    this.creditPlans = res.creditPlans;
                    this.callPlans = _.groupBy(res.callPlans,'category');
                    this.didPlans = res.didPlans;
                });
    }

    packageSelected($packageId): void {
        this.disableBtns = true;
        this.selectedPackageId = $packageId;
        // console.log("MY PACKAGE ID: "+this.selectedPackageId);

        this.packagesService.validatePackage(this.selectedPackageId)
            .subscribe(
                res => {
                    // console.log("COMPONENT RESPONSE: "+res.body.result.isValid+" message: "+res.body.result.message);
                    let message = res.body.result.message;
                    if(res.body.result.isValid === true) {
                        this.disableBtns = false;
                    } else {
                        this.router.navigate(['/purchasemessage/'+message]);
                    }


                },
                res => {
                    this.disableBtns = true;
                }
            );

    }

    goToPaypal():void {
        this.disableBtns = true;
        this.isProcessing = true;
        this.paypalService.createPaypalPayment(this.selectedPackageId)
            .subscribe(
                res => {

                    if(res.status) {
                        CommonUtils.redirectTo(res.body.redirectUrl)
                    } else {
                        this.disableBtns = false;
                        this.isProcessing = false;
                        let message = "Network error "+res.body.code;
                        this.router.navigate(['/purchasemessage/'+message]);
                    }

                },
                res => {
                    this.disableBtns = false;
                    this.isProcessing = false;
                }
            );
    }
}