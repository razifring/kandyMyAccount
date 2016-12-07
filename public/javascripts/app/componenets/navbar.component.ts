import {Component} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {UserService} from "../services/user.service";
import {Device} from "ng2-device-detector";


@Component({
    selector: 'navbar',
    templateUrl: 'templates/navbar.html',
    providers: [UserService]
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
            userObservable.subscribe(value => this.msisdn = value.msisdn);
        }

        this.userAccessToken = this.userService.getUserAccessToken().subscribe(
            value => this.userAccessToken = value.userAccessToken
        );

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