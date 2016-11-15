import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import {CountryCodes} from "../utils/countryCodes";
import {CommonUtils} from "../utils/commonUtils";

@Component({
    templateUrl: 'templates/login.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';
    countriesArray;
    lookupCoutnries = {};
    selectedCountry;

    public step: number = 1;

    constructor(
        private router: Router,
        private authenticationService: AuthService,
        private countryCodes: CountryCodes) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
        this.countriesArray = this.countryCodes.getCodes();
        for (var i = 0, len = this.countriesArray.length; i < len; i++) {
            this.lookupCoutnries[this.countriesArray[i].country] = this.countriesArray[i];
        }


        
        this.selectedCountry = this.lookupCoutnries['PH'];

    }

    selectCountry(countryCode) {
        this.selectedCountry = this.lookupCoutnries[countryCode];
    }


    login() {
        var phonenumber = CommonUtils.cleanPhonenumber(this.model.phonenumber);
        console.log(phonenumber);
        if(!phonenumber.match(/^\d+$/))
        {
            this.error = 'Invalid number';
            return;
        }
        this.loading = true;
        this.authenticationService.sendOtp(this.selectedCountry.code + this.model.phonenumber)
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
        if(!this.model.otp.match(/^\d+$/))
        {
            this.error = 'Invalid number';
            return;
        }

        this.loading = true;
        this.authenticationService.validateOtp(this.model.otp, this.selectedCountry.country, this.model.phonenumber)
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
        this.step = step;
        this.error = '';
    }
}
