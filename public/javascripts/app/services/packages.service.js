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
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var core_1 = require("@angular/core");
var common_service_1 = require("./common.service");
var PackagesService = (function () {
    function PackagesService(_http) {
        this._http = _http;
        this._http = _http;
    }
    PackagesService.prototype.getActivePackages = function () {
        return this._http.get('/packages')
            .map(common_service_1.CommonService.extractData);
    };
    PackagesService.prototype.claimCard = function (card) {
        return this._http.post('/cards', JSON.stringify(card))
            .map(function (res) { return res.json(); });
    };
    PackagesService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], PackagesService);
    return PackagesService;
}());
exports.PackagesService = PackagesService;
//# sourceMappingURL=packages.service.js.map