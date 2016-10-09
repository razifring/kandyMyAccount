"use strict";
var router_1 = require('@angular/router');
var myAccount_component_1 = require('./componenets/myAccount.component');
var purchase_component_1 = require('./componenets/purchase.component');
var login_component_1 = require("./componenets/login.component");
var auth_guard_1 = require("./_guards/auth.guard");
var appRoutes = [
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'myAccount', component: myAccount_component_1.MyAccountComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'purchase', component: purchase_component_1.PurchaseComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: '', component: myAccount_component_1.MyAccountComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: '**', component: login_component_1.LoginComponent }
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map