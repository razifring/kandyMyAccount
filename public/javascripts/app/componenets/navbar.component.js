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
var auth_service_1 = require("../services/auth.service");
var user_service_1 = require("../services/user.service");
var ng2_device_detector_1 = require("ng2-device-detector");
var NavBarComponent = (function () {
    function NavBarComponent(authService, userService, device) {
        var _this = this;
        this.authService = authService;
        this.userService = userService;
        this.device = device;
        this.isCollapsed = true;
        var userObservable = userService.getCurrentUser();
        if (userObservable) {
            userObservable.subscribe(function (value) { return _this.msisdn = value.msisdn; });
        }
    }
    NavBarComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log(this.device.device);
        this.authService.isLoggedIn.subscribe(function (value) { _this._isLoggedIn = value; });
    };
    NavBarComponent = __decorate([
        core_1.Component({
            selector: 'navbar',
            templateUrl: 'templates/navbar.html',
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, user_service_1.UserService, ng2_device_detector_1.Device])
    ], NavBarComponent);
    return NavBarComponent;
}());
exports.NavBarComponent = NavBarComponent;
//# sourceMappingURL=navbar.component.js.map