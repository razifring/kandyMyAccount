import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyAccountComponent }  from './componenets/myAccount.component';
import { PurchaseComponent }    from './componenets/purchase.component';
import {LoginComponent} from "./componenets/login.component";
import {HomeComponent} from "./componenets/home.component";
import {AuthGuard} from "./_guards/auth.guard";
import {ThankyouComponent} from "./componenets/thankyou.component";
import {ProcessingComponent} from "./componenets/processing.component";

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'myAccount', component: MyAccountComponent, canActivate: [AuthGuard]},
    { path: 'purchase', component: PurchaseComponent, canActivate: [AuthGuard]},
    { path: 'processing/:msisdn', component: ProcessingComponent},
    { path: 'thankyou', component: ThankyouComponent},
    { path: '', component: MyAccountComponent, canActivate: [AuthGuard]},
    { path: '**', component: LoginComponent}
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);