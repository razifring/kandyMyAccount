"use strict";
var router_1 = require('@angular/router');
var myAccount_component_1 = require('./componenets/myAccount.component');
var purchase_component_1 = require('./componenets/purchase.component');
var login_component_1 = require("./componenets/login.component");
var auth_guard_1 = require("./_guards/auth.guard");
var thankyou_component_1 = require("./componenets/thankyou.component");
var processing_component_1 = require("./componenets/processing.component");
var cards_component_1 = require("./componenets/cards.component");
var autoLogin_component_1 = require("./componenets/autoLogin.component");
var rates_component_1 = require("./componenets/rates.component");
var history_component_1 = require("./componenets/history.component");
var stickershop_component_1 = require("./componenets/stickershop.component");
var appRoutes = [
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'login/:uat/:msisdn', component: autoLogin_component_1.AutoLoginComponent },
    { path: 'myAccount', component: myAccount_component_1.MyAccountComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'purchase', component: purchase_component_1.PurchaseComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'stickershop', component: stickershop_component_1.StickershopComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'processing/:msisdn', component: processing_component_1.ProcessingComponent },
    { path: 'thankyou', component: thankyou_component_1.ThankyouComponent },
    { path: 'rates', component: rates_component_1.RatesComponent },
    { path: 'cards', component: cards_component_1.CardsComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'history', component: history_component_1.HistoryComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: '', component: myAccount_component_1.MyAccountComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: '**', component: login_component_1.LoginComponent }
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map