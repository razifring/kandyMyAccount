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
var router_1 = require('@angular/router');
var auth_service_1 = require('../services/auth.service');
var AutoLoginComponent = (function () {
    function AutoLoginComponent(router, route, authenticationService) {
        this.router = router;
        this.route = route;
        this.authenticationService = authenticationService;
        this.isLoading = true;
        this.error = '';
    }
    AutoLoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.route.queryParams.subscribe(function (param) {
            var msisdn = _this.route.snapshot.params['msisdn'];
            var userAccessToken = _this.route.snapshot.params['uat'];
            if (userAccessToken) {
                _this.authenticationService.autologin(msisdn, userAccessToken)
                    .subscribe(function (res) {
                    _this.isLoading = false;
                    if (res.status) {
                        _this.router.navigate(['/myAccount']);
                    }
                    else {
                        _this.error = res.body.message;
                    }
                }, function (res) {
                    _this.isLoading = false;
                    _this.error = res.message;
                });
            }
        });
    };
    AutoLoginComponent = __decorate([
        core_1.Component({
            templateUrl: 'templates/autologin.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, auth_service_1.AuthService])
    ], AutoLoginComponent);
    return AutoLoginComponent;
}());
exports.AutoLoginComponent = AutoLoginComponent;
//# sourceMappingURL=autoLogin.component.js.map