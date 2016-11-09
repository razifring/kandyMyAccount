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
var SelectPackagesComponent = (function () {
    function SelectPackagesComponent() {
        this.packages = [];
        this.onSelect = new core_1.EventEmitter();
    }
    SelectPackagesComponent.prototype.packageSelected = function (packageId) {
        this.onSelect.emit(packageId);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SelectPackagesComponent.prototype, "onSelect", void 0);
    SelectPackagesComponent = __decorate([
        core_1.Component({
            selector: 'select-package',
            template: " <div>Select a package:</div>\n                <ul class=\"select-packages\">\n                    <li [class.active]=\"selected==package.id\" class=\"row select-package-item\" (click)=\"packageSelected(package.id)\" *ngFor=\"let package of packages\">\n                        <div class=\"col-md-12\">                        \n                            <div class=\"row\">\n                                <div class=\"package-price col-xs-3 col-md-2\">{{package.cost}}</div>\n                                <div class=\"package-name col-xs-9 col-md-10\">{{package.title}}</div>\n                            </div>\n                            <div class=\"row\">\n                                <div class=\"package-price col-xs-3 col-md-2\"></div>\n                                <small class=\"text-muted col-xs-9 package-description col-md-10\">{{package.description}}</small>\n                            </div>\n                        </div>\n                    </li>\n                </ul>",
            inputs: ['packages', 'selected']
        }), 
        __metadata('design:paramtypes', [])
    ], SelectPackagesComponent);
    return SelectPackagesComponent;
}());
exports.SelectPackagesComponent = SelectPackagesComponent;
//# sourceMappingURL=selectPackages.component.js.map