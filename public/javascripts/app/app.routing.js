"use strict";
var router_1 = require('@angular/router');
var myAccount_component_1 = require('./componenets/myAccount.component');
var purchase_component_1 = require('./componenets/purchase.component');
var appRoutes = [
    { path: 'myAccount', component: myAccount_component_1.MyAccountComponent },
    { path: 'purchase', component: purchase_component_1.PurchaseComponent },
    { path: '', component: myAccount_component_1.MyAccountComponent },
    { path: '**', component: myAccount_component_1.MyAccountComponent }
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map