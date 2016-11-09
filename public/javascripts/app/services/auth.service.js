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
var http_1 = require('@angular/http');
var Rx_1 = require('rxjs/Rx');
require('rxjs/add/operator/map');
var router_1 = require("@angular/router");
var user_1 = require("../dataObjects/user");
var user_service_1 = require("./user.service");
var cookies_service_1 = require("angular2-cookie/services/cookies.service");
var AuthService = (function () {
    function AuthService(router, http, userService, cookieService) {
        this.router = router;
        this.http = http;
        this.userService = userService;
        this.cookieService = cookieService;
        this.token = '';
        this.isLoggedIn = new Rx_1.BehaviorSubject(false);
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            this.userService.setCurrentUser(user_1.User.create(currentUser.msisdn));
        }
        // set token if saved in local storage
        this.token = currentUser && currentUser.token;
        this.isLoggedIn.next(AuthService.checkLoggedIn());
    }
    AuthService.prototype.sendOtp = function (phonenumber) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var options = {
            headers: headers
        };
        return this.http.post('/api/otp', JSON.stringify({ phonenumber: phonenumber }), options)
            .map(function (response) {
            var result = response.json();
            var status = result && result.status;
            if (status) {
                localStorage.setItem('msisdn', phonenumber);
                return true;
            }
            else {
                return response.json().err;
            }
        });
    };
    AuthService.prototype.validateOtp = function (otp, countryCode, phonenumber) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var options = {
            headers: headers
        };
        var params = {
            otp: otp,
            countryCode: countryCode,
            phonenumber: phonenumber
        };
        return this.http.post('/api/auth/login', JSON.stringify(params), options)
            .map(function (response) {
            var result = response.json();
            var status = result && result.status;
            if (status) {
                // set token property
                var msisdn = localStorage.getItem('msisdn');
                // store username and token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify({ msisdn: msisdn }));
                _this.userService.setCurrentUser(user_1.User.create(msisdn));
                _this.isLoggedIn.next(true);
                // return true to indicate successful login
                return true;
            }
            else {
                // return false to indicate failed login
                return false;
            }
        });
    };
    AuthService.prototype.logout = function () {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
        localStorage.removeItem('msisdn');
        this.router.navigate(['/login']);
        this.cookieService.remove('userSession');
        this.userService.resetUser();
        this.isLoggedIn.next(false);
    };
    AuthService.checkLoggedIn = function () {
        return !!localStorage.getItem('currentUser');
    };
    AuthService.prototype.getToken = function () {
        return this.token;
    };
    AuthService.prototype.autologin = function (msisdn, userAccessToken) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var options = {
            headers: headers
        };
        return this.http
            .post('/api/auth/autologin', { msisdn: msisdn, userAccessToken: userAccessToken }, options)
            .map(function (response) {
            var result = response.json();
            var status = result && result.status;
            if (status) {
                // set token property
                var msisdn = result.body.userId;
                // store username and token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify({ msisdn: msisdn }));
                _this.userService.setCurrentUser(user_1.User.create(msisdn));
                _this.isLoggedIn.next(true);
                // return true to indicate successful login
                return result;
            }
            else {
                // return false to indicate failed login
                return result;
            }
        });
    };
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, http_1.Http, user_service_1.UserService, cookies_service_1.CookieService])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map