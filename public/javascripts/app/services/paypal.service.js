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
var http_client_1 = require('../utils/http-client');
require('rxjs/add/operator/map');
var core_1 = require("@angular/core");
var common_service_1 = require("./common.service");
var user_service_1 = require("./user.service");
var PaypalService = (function () {
    function PaypalService(_http, userService) {
        this._http = _http;
        this.userService = userService;
    }
    PaypalService.prototype.createPaypalPayment = function (packageId) {
        return this._http
            .addJsonContentType()
            .post('/api/paypal/', { packageId: packageId, msisdn: this.userService.getCurrentUser().getValue().msisdn }, {})
            .map(common_service_1.CommonService.extractData);
    };
    PaypalService.prototype.executePayment = function (msisdn, paymentId, payerId) {
        return this._http
            .addJsonContentType()
            .post('/api/paypal/execute', { msisdn: msisdn, paymentId: paymentId, payerId: payerId }, {})
            .map(common_service_1.CommonService.extractData);
    };
    PaypalService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_client_1.HttpClient, user_service_1.UserService])
    ], PaypalService);
    return PaypalService;
}());
exports.PaypalService = PaypalService;
//# sourceMappingURL=paypal.service.js.map