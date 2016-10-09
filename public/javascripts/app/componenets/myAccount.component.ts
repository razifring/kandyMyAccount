import {Component, OnInit} from '@angular/core';
import {PackagesService} from '../services/packages.service';

@Component({
    templateUrl: 'templates/my-account.html',
    providers: [PackagesService]
})

export class MyAccountComponent implements OnInit{


    balance = 0.0;
    activePackages = [];

    constructor(private packagesService: PackagesService){}

    ngOnInit(): void {
        this.packagesService.getActivePackages()
            .subscribe(res => this.activePackages = res);
    }
}