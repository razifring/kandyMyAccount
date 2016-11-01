import {Component, Input} from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
    selector: 'navbar',
    templateUrl: 'templates/navbar.html',
})

export class NavBarComponent {

    _isLoggedIn: boolean;
    public isCollapsed = true;

    constructor(
        private authService: AuthService
    ) {

    }

    ngOnInit(): void {
        this.authService.isLoggedIn.subscribe(
            value => {this._isLoggedIn = value; console.log(value);}
        );
    }


}