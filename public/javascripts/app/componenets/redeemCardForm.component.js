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
var cardModel_1 = require("../models/cardModel");
var packages_service_1 = require("../services/packages.service");
var RedeemCardFormComponent = (function () {
    function RedeemCardFormComponent(packagesService) {
        this.packagesService = packagesService;
        this.model = new cardModel_1.CardModel('', '', '');
        this.submitted = false;
        this.processing = false;
    }
    RedeemCardFormComponent.prototype.onSubmit = function () {
        var _this = this;
        this.submitted = true;
        this.processing = true;
        var cardNum = this.model.getNumber();
        this.packagesService.redeemCard(cardNum)
            .subscribe(function (res) {
            _this.processing = false;
            _this.successResponse = 'You have redeemed the card successfully.';
            _this.model.reset();
        });
    };
    RedeemCardFormComponent = __decorate([
        core_1.Component({
            selector: 'redeem-card-form',
            templateUrl: 'templates/redeem-card-form.html',
            providers: [packages_service_1.PackagesService]
        }), 
        __metadata('design:paramtypes', [packages_service_1.PackagesService])
    ], RedeemCardFormComponent);
    return RedeemCardFormComponent;
}());
exports.RedeemCardFormComponent = RedeemCardFormComponent;
//# sourceMappingURL=redeemCardForm.component.js.map