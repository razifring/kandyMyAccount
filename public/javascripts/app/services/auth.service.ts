import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {BehaviorSubject, Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {Router} from "@angular/router";
import {User} from "../dataObjects/user";
import {UserService} from "./user.service";
import {DropdownModule} from "ng2-dropdown";

@Injectable()
export class AuthService {
    public token: string = '';
    public isLoggedIn = new BehaviorSubject<boolean>(false);


    constructor(
        private router: Router,
        private http: Http,
        private userService: UserService
    ) {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if(currentUser)
        {
            this.userService.setCurrentUser(User.create(currentUser.msisdn));
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

        return this.http.post('/api/authenticate', JSON.stringify(params), options)
            .map((response: Response) => {
                var result = response.json();
                let status = result && result.status;

                if (status) {
                    // set token property
                    this.token = result.token;
                    var msisdn = localStorage.getItem('msisdn');
                    // store username and token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ msisdn: msisdn, token: this.token }));
                    this.userService.setCurrentUser(User.create(msisdn));
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
        this.isLoggedIn.next(false);
    }

    private static checkLoggedIn(): boolean{
        return !!localStorage.getItem('currentUser');
    }

    getToken():string{
        return this.token;
    }

}