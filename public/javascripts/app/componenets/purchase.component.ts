import {Component, OnInit} from '@angular/core';
import {PackagesService} from "../services/packages.service";
import {PaypalService} from "../services/paypal.service";
import {CommonUtils} from "../utils/commonUtils";


@Component({
    templateUrl: 'templates/purchase.html',
    providers: [PackagesService]
})

export class PurchaseComponent implements OnInit{
    callPlans = [];
    didPlans = [];
    selectedPackageId;
    disableBtns = true;

    constructor(
        private packagesService: PackagesService,
        private paypalService: PaypalService
    ){}

    ngOnInit(): void {
        this.packagesService.getPurchsablePackages()
            .subscribe(
                res => {
                    this.callPlans = res.callPlans;
                    this.didPlans = res.didPlans;
                });
    }

    packageSelected($packageId): void {
        this.selectedPackageId = $packageId;
        this.disableBtns = false;
    }

    goToPaypal():void {
        this.disableBtns = true;
        this.paypalService.createPaypalPayment(this.selectedPackageId)
            .subscribe(
                res => CommonUtils.redirectTo(res.redirectUrl),
                res => this.disableBtns = false
        );
    }
}