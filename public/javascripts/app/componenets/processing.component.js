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
var paypal_service_1 = require("../services/paypal.service");
var ProcessingComponent = (function () {
    function ProcessingComponent(paypalService, route, router) {
        this.paypalService = paypalService;
        this.route = route;
        this.router = router;
    }
    ProcessingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isProcessing = true;
        this.subscription = this.route.queryParams.subscribe(function (param) {
            var msisdn = _this.route.snapshot.params['msisdn'];
            var paymentId = param.paymentId;
            var payerId = param.PayerID;
            if (paymentId) {
                _this.paypalService.executePayment(msisdn, paymentId, payerId)
                    .subscribe(function (res) {
                    _this.isProcessing = false;
                    _this.router.navigate(['/thankyou']);
                });
            }
        });
    };
    ProcessingComponent.prototype.ngOnDestroy = function () {
        // prevent memory leak by unsubscribing
        this.subscription.unsubscribe();
    };
    ProcessingComponent = __decorate([
        core_1.Component({
            templateUrl: 'templates/processing.html'
        }), 
        __metadata('design:paramtypes', [paypal_service_1.PaypalService, router_1.ActivatedRoute, router_1.Router])
    ], ProcessingComponent);
    return ProcessingComponent;
}());
exports.ProcessingComponent = ProcessingComponent;
//# sourceMappingURL=processing.component.js.map