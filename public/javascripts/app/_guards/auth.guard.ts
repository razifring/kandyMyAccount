import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {CookieService} from "angular2-cookie/services/cookies.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private cookieService: CookieService
    ) { }

    canActivate() {
        if(this.cookieService.get('userSession'))
        {
            return true;
        }

        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;
    }
}