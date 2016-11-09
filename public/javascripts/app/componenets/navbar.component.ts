import * as _ from 'lodash';
import {Component} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {UserService} from "../services/user.service";

@Component({
    selector: 'navbar',
    templateUrl: 'templates/navBar.html',
})

export class NavBarComponent {

    _isLoggedIn: boolean;
    public isCollapsed = true;
    public msisdn;

    constructor(
        private authService: AuthService,
        private userService: UserService
    ) {
        let userObservable = userService.getCurrentUser();
        if(userObservable){
            userObservable.subscribe(value => this.msisdn = value.msisdn);
        }
    }

    ngOnInit(): void {
        this.authService.isLoggedIn.subscribe(
            value => {this._isLoggedIn = value;}
        );
    }


}