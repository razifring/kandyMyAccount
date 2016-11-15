"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var auth_service_1 = require('../services/auth.service');
var countryCodes_1 = require("../utils/countryCodes");
var commonUtils_1 = require("../utils/commonUtils");
var LoginComponent = (function () {
    function LoginComponent(router, authenticationService, countryCodes) {
        this.router = router;
        this.authenticationService = authenticationService;
        this.countryCodes = countryCodes;
        this.model = {};
        this.loading = false;
        this.error = '';
        this.lookupCoutnries = {};
        this.step = 1;
    }
    LoginComponent.prototype.ngOnInit = function () {
        // reset login status
        this.authenticationService.logout();
        this.countriesArray = this.countryCodes.getCodes();
        for (var i = 0, len = this.countriesArray.length; i < len; i++) {
            this.lookupCoutnries[this.countriesArray[i].country] = this.countriesArray[i];
        }
        this.selectedCountry = this.lookupCoutnries['PH'];
    };
    LoginComponent.prototype.selectCountry = function (countryCode) {
        this.selectedCountry = this.lookupCoutnries[countryCode];
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        var phonenumber = commonUtils_1.CommonUtils.cleanPhonenumber(this.model.phonenumber);
        console.log(phonenumber);
        if (!phonenumber.match(/^\d+$/)) {
            this.error = 'Invalid number';
            return;
        }
        this.loading = true;
        this.authenticationService.sendOtp(this.selectedCountry.code + this.model.phonenumber)
            .subscribe(function (result) {
            console.log(result);
            if (result === true) {
                _this.loading = false;
                _this.step = 2;
            }
            else {
                _this.error = result;
                _this.loading = false;
            }
        });
    };
    LoginComponent.prototype.validateOtp = function () {
        var _this = this;
        if (!this.model.otp.match(/^\d+$/)) {
            this.error = 'Invalid number';
            return;
        }
        this.loading = true;
        this.authenticationService.validateOtp(this.model.otp, this.selectedCountry.country, this.model.phonenumber)
            .subscribe(function (result) {
            console.log(result);
            if (result === true) {
                _this.router.navigate(['/']);
            }
            else {
                _this.error = 'OTP is incorrect';
                _this.loading = false;
            }
        });
    };
    LoginComponent.prototype.goTo = function (step) {
        this.step = step;
        this.error = '';
    };
    LoginComponent = __decorate([
        core_1.Component({
            templateUrl: 'templates/login.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, auth_service_1.AuthService, countryCodes_1.CountryCodes])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map