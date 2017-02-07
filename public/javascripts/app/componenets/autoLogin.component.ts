import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { AuthService } from '../services/auth.service';
import {Subscription} from "rxjs";

@Component({
    templateUrl: 'templates/autologin.html'
})

export class AutoLoginComponent implements OnInit {
    isLoading = true;
    error = '';
    private subscription: Subscription;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private authenticationService: AuthService
    ){}

    ngOnInit() {
        this.subscription = this.route.queryParams.subscribe(
            (param: any) => {
                let msisdn = this.route.snapshot.params['msisdn'];
                let userAccessToken = this.route.snapshot.params['uat'];
                let destinationPage = _.get(this.route.snapshot.queryParams, 'page');
                if(userAccessToken)
                {
                    this.authenticationService.autologin(msisdn, userAccessToken)
                        .subscribe(
                            res => {
                                this.isLoading = false;
                                if(res.status) {
                                    console.log(destinationPage);
                                    if(destinationPage) {
                                        this.router.navigate(['/' + destinationPage]);
                                    } else {
                                        this.router.navigate(['/myAccount']);
                                    }
                                } else {
                                    this.error = res.body.message;
                                }
                            },
                            res => {
                                this.isLoading = false;
                                this.error = res.message;
                            }
                    );
                }
            });

    }


}
