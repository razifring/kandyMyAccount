import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
    templateUrl: 'templates/login.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';
    public step: number = 1;

    constructor(
        private router: Router,
        private authenticationService: AuthService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
    }

    login() {
        this.loading = true;
        this.authenticationService.sendOtp(this.model.phonenumber)
            .subscribe(result => {
                console.log(result);
                if (result === true) {
                    this.loading = false;
                    this.step = 2;

                } else {
                    this.error = result;
                    this.loading = false;
                }
            });
    }

    validateOtp(){
        this.loading = true;
        this.authenticationService.validateOtp(this.model.otp)
            .subscribe(result => {
                console.log(result);
                if (result === true) {
                    this.router.navigate(['/']);
                } else {
                    this.error = 'OTP is incorrect';
                    this.loading = false;
                }
            });
    }

    goTo(step){
        this.step = 1;
    }
}
