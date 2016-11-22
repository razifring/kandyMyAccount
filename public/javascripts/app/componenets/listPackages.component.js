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
var ListPackagesComponent = (function () {
    function ListPackagesComponent() {
        this.packages = [];
    }
    ListPackagesComponent = __decorate([
        core_1.Component({
            selector: 'list-packages',
            template: "<ul>\n                    <li class=\"active-package-item top15\" *ngFor=\"let package of packages\">\n                        <div><span class=\"active-package-item-field\">Name</span>{{package.name}}</div>\n                        <div *ngIf=\"package.balance > 0\"><span class=\"active-package-item-field\">Balance</span>&#36;{{package.balance}}</div>\n                        <div *ngIf=\"package.remainingMinutes > 0\"><span class=\"active-package-item-field\">Remaining Time</span>{{package.remainingMinutes}} minutes</div>\n                        <div><span class=\"active-package-item-field\">Start Time</span>{{package.startTime | date: 'dd/MM/yyyy HH:mm'}}</div>\n                        <div><span class=\"active-package-item-field\">End Time</span>{{package.endTime | date: 'dd/MM/yyyy HH:mm'}}</div>\n                    </li>\n                </ul>",
            inputs: ['packages']
        }), 
        __metadata('design:paramtypes', [])
    ], ListPackagesComponent);
    return ListPackagesComponent;
}());
exports.ListPackagesComponent = ListPackagesComponent;
//# sourceMappingURL=listPackages.component.js.map