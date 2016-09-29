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
var packages_service_1 = require('../services/packages.service');
var MyAccountComponent = (function () {
    function MyAccountComponent(packagesService) {
        this.packagesService = packagesService;
        this.balance = 0.0;
        this.activePackages = [];
    }
    MyAccountComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.packagesService.getActivePackages()
            .subscribe(function (res) { return _this.activePackages = res; });
    };
    MyAccountComponent = __decorate([
        core_1.Component({
            selector: 'my-account',
            templateUrl: 'templates/my-account.html',
            providers: [packages_service_1.PackagesService]
        }), 
        __metadata('design:paramtypes', [packages_service_1.PackagesService])
    ], MyAccountComponent);
    return MyAccountComponent;
}());
exports.MyAccountComponent = MyAccountComponent;
//# sourceMappingURL=myAccount.component.js.map