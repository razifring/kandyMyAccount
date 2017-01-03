import {Component} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {UserService} from "../services/user.service";
import {Device} from "ng2-device-detector";


@Component({
    selector: 'navbar',
    templateUrl: 'templates/navbar.html'
})

export class NavBarComponent {

    _isLoggedIn: boolean;
    public isCollapsed = true;
    public msisdn;
    public userAccessToken;

    constructor(
        private authService: AuthService,
        private userService: UserService,
        public device: Device
    ) {
        let userObservable = this.userService.getCurrentUser();
        if(userObservable){
            userObservable.subscribe(value => {
                this.msisdn = value.msisdn;
                /*
                *** Calls stickershop UAT generator
                if(this.msisdn) {
                    this.userAccessToken = this.authService.getUserAccessToken(this.msisdn).subscribe(
                        userAccessToken => this.userAccessToken = userAccessToken
                    );
                }
                */
            });
        }



         /*
        let userAccessTokenObservable = this.userService.getUserAccessToken();
        if(userAccessTokenObservable) {
           userAccessTokenObservable.subscribe(value => this.userAccessToken = value.userAccessToken);

        } */


    }

    ngOnInit(): void {
        this.authService.isLoggedIn.subscribe(
            value => {this._isLoggedIn = value;}
        );
    }


}