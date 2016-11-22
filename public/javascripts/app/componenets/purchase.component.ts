import * as _ from 'lodash';

import {Component, OnInit} from '@angular/core';
import {PackagesService} from "../services/packages.service";
import {PaypalService} from "../services/paypal.service";
import {CommonUtils} from "../utils/commonUtils";


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
        private paypalService: PaypalService
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
        this.selectedPackageId = $packageId;
        this.disableBtns = false;
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
                    }

                },
                res => {
                    this.disableBtns = false;
                    this.isProcessing = false;
                }
        );
    }
}