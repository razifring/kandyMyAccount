import {Component, OnInit} from '@angular/core';
import {PackagesService} from "../services/packages.service";


@Component({
    templateUrl: 'templates/purchase.html',
    providers: [PackagesService]
})

export class PurchaseComponent implements OnInit{
    callPlans = [];
    didPlans = [];

    constructor(private packagesService: PackagesService){}

    ngOnInit(): void {
        this.packagesService.getPurchsablePackages()
            .subscribe(
                res => {
                    this.callPlans = res.callPlans;
                    this.didPlans = res.didPlans;
                });
    }
}