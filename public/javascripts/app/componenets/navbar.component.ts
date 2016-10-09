import {Component, Input} from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
    selector: 'navbar',
    templateUrl: 'templates/navbar.html',
})

export class NavBarComponent {

    _isLoggedIn: boolean;

    constructor(
        private authService: AuthService
    ) {

    }

    ngOnInit(): void {
        //this._isLoggedIn = this.authService.isLoggedIn.getValue();
        var self = this;
        this.authService.isLoggedIn.subscribe(function(value){
            self._isLoggedIn = value;
        });
    }


}