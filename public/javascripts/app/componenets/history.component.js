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
var history_service_1 = require("../services/history.service");
var HistoryComponent = (function () {
    function HistoryComponent(historyService) {
        this.historyService = historyService;
        this.type = 'packages';
        this.processing = false;
        var todayDate = new Date();
        this.endDate = this.todayDate = todayDate.toISOString().substring(0, 10);
        var lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        this.startDate = lastMonth.toISOString().substring(0, 10);
    }
    HistoryComponent.prototype.ngOnInit = function () {
    };
    HistoryComponent.prototype.searchHistory = function () {
        var _this = this;
        this.processing = true;
        var start = this.startDate;
        var end = this.endDate + ' 23:59:59';
        this.historyService.getHistory(this.type, start, end)
            .subscribe(function (res) {
            _this.packagesHistory = _this.callHistory = _this.smsHistory = '';
            if (_this.type === 'calls') {
                _this.callHistory = res.body.history;
            }
            else if (_this.type === 'sms') {
                _this.smsHistory = res.body.history;
            }
            else if (_this.type === 'packages') {
                _this.packagesHistory = res.body.history;
            }
            _this.processing = false;
            console.log(res);
        });
    };
    HistoryComponent = __decorate([
        core_1.Component({
            templateUrl: 'templates/history.html',
            providers: [packages_service_1.PackagesService]
        }), 
        __metadata('design:paramtypes', [history_service_1.HistoryService])
    ], HistoryComponent);
    return HistoryComponent;
}());
exports.HistoryComponent = HistoryComponent;
//# sourceMappingURL=history.component.js.map