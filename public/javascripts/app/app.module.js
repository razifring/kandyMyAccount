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
var platform_browser_1 = require('@angular/platform-browser');
var http_1 = require('@angular/http');
var app_component_1 = require('./componenets/app.component');
var app_routing_1 = require('./app.routing');
var navbar_component_1 = require("./componenets/navbar.component");
var myAccount_component_1 = require("./componenets/myAccount.component");
var purchase_component_1 = require("./componenets/purchase.component");
var listPackages_component_1 = require("./componenets/listPackages.component");
var forms_1 = require("@angular/forms");
var login_component_1 = require("./componenets/login.component");
var auth_guard_1 = require("./_guards/auth.guard");
var auth_service_1 = require("./services/auth.service");
var user_service_1 = require("./services/user.service");
var http_client_1 = require("./utils/http-client");
var selectPackages_component_1 = require("./componenets/selectPackages.component");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                http_1.JsonpModule,
                app_routing_1.routing
            ],
            providers: [
                auth_guard_1.AuthGuard,
                http_client_1.HttpClient,
                auth_service_1.AuthService,
                user_service_1.UserService,
            ],
            declarations: [
                app_component_1.AppComponent,
                login_component_1.LoginComponent,
                myAccount_component_1.MyAccountComponent,
                navbar_component_1.NavBarComponent,
                purchase_component_1.PurchaseComponent,
                listPackages_component_1.ListPackagesComponent,
                selectPackages_component_1.SelectPackagesComponent
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map