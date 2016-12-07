import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {BehaviorSubject, Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {Router} from "@angular/router";
import {User} from "../dataObjects/user";
import {UserService} from "./user.service";
import {CookieService} from "angular2-cookie/services/cookies.service";
import {CommonService} from "./common.service";


@Injectable()
export class AuthService {
    public token: string = '';
    public isLoggedIn = new BehaviorSubject<boolean>(false);
    public webview = false;
    public userAccessToken;


    constructor(
        private router: Router,
        private http: Http,
        private userService: UserService,
        private cookieService: CookieService
    ) {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if(currentUser)
        {
            this.userService.setCurrentUser(User.create(currentUser.msisdn, currentUser.isPremium));
        }
        // set token if saved in local storage
        this.token = currentUser && currentUser.token;
        this.isLoggedIn.next(AuthService.checkLoggedIn());
    }

    sendOtp(phonenumber){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var options = {
            headers: headers
        };
        return this.http.post('/api/otp', JSON.stringify({ phonenumber: phonenumber}), options)
            .map((response: Response) => {
                var result = response.json();
                let status = result && result.status;
                if(status)
                {
                    localStorage.setItem('msisdn', phonenumber);

                    return true;
                }
                else
                {
                    return response.json().err;
                }
            });
    }

    validateOtp(otp, countryCode, phonenumber): Observable<boolean> {
        var headers = new Headers();
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
            .map((response: Response) => {
                var result = response.json();
                let status = result && result.status;

                if (status) {
                    // set token property
                    var msisdn = localStorage.getItem('msisdn');
                    // store username and token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ msisdn: msisdn, isPremium:result.body.isPremium}));
                    this.userService.setCurrentUser(User.create(msisdn, result.body.isPremium));
                    this.isLoggedIn.next(true);
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
        localStorage.removeItem('msisdn');
        this.router.navigate(['/login']);
        this.cookieService.remove('userSession');
        this.userService.resetUser();
        this.isLoggedIn.next(false);
    }

    private static checkLoggedIn(): boolean{
        return !!localStorage.getItem('currentUser');
    }

    getToken():string{
        return this.token;
    }

    autologin(msisdn, userAccessToken) : Observable<any> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var options = {
            headers: headers
        };
        return this.http
            .post('/api/auth/autologin', {msisdn:msisdn, userAccessToken: userAccessToken}, options)
            .map((response: Response) => {
                var result = response.json();
                this.webview = true;
                let status = result && result.status;

                if (status) {
                    // set token property
                    var msisdn = result.body.userId;
                    // store username and token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ msisdn: msisdn, isPremium:result.body.isPremium}));
                    this.userService.setCurrentUser(User.create(msisdn, result.body.isPremium));
                    this.isLoggedIn.next(true);
                    // return true to indicate successful login
                    return result;
                } else {
                    // return false to indicate failed login
                    return result;
                }
            });
    }

    getUserAccessToken(userId){
        if(!this.userAccessToken){
            this.userAccessToken = this.http.get('/api/authentication/uat/' + userId)
                .map(CommonService.extractData);
        }
        return this.userAccessToken;
    }

}