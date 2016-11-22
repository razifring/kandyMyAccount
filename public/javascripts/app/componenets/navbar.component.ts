import {Component} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {UserService} from "../services/user.service";
import {Device} from "ng2-device-detector";

@Component({
    selector: 'navbar',
    templateUrl: 'templates/navbar.html',
})

export class NavBarComponent {

    _isLoggedIn: boolean;
    public isCollapsed = true;
    public msisdn;

    constructor(
        private authService: AuthService,
        private userService: UserService,
        public device: Device
    ) {
        let userObservable = this.userService.getCurrentUser();
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