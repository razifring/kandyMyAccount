import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyAccountComponent }  from './componenets/myAccount.component';
import { PurchaseComponent }    from './componenets/purchase.component';

const appRoutes: Routes = [
    { path: 'myAccount', component: MyAccountComponent},
    { path: 'purchase', component: PurchaseComponent},
    { path: '', component: MyAccountComponent},
    { path: '**', component: MyAccountComponent}
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);