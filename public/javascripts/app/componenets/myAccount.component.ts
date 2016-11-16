import * as _ from 'lodash';
import {Component, OnInit} from '@angular/core';
import {PackagesService} from '../services/packages.service';
import {UserService} from "../services/user.service";

@Component({
    templateUrl: 'templates/my-account.html',
    providers: [PackagesService]
})

export class MyAccountComponent implements OnInit{

    activePackages = [];

    constructor(private packagesService: PackagesService, userService: UserService){

        console.log(userService.getCurrentUser().getValue().isPremium);
    }


    ngOnInit(): void {
        this.packagesService.getActivePackages()
            .subscribe(
                res => {
                    console.log(_.groupBy(res.body.packages, 'type'));
                    this.activePackages = _.groupBy(res.body.packages, 'type');
                }
            );
    }
}