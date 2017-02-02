import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyAccountComponent }  from './componenets/myAccount.component';
import { PurchaseComponent }    from './componenets/purchase.component';
import {LoginComponent} from "./componenets/login.component";
import {AuthGuard} from "./_guards/auth.guard";
import {ThankyouComponent} from "./componenets/thankyou.component";
import {PurchaseMessageComponent} from "./componenets/purchasemessage.component";
import {ProcessingComponent} from "./componenets/processing.component";
import {CardsComponent} from "./componenets/cards.component";
import {AutoLoginComponent} from "./componenets/autoLogin.component";
import {RatesComponent} from "./componenets/rates.component";
import {HistoryComponent} from "./componenets/history.component";
import {StickershopComponent} from "./componenets/stickershop.component";
import {InappPurchaseComponent} from "./componenets/inappPurchase.component";

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'login/:uat/:msisdn/', component: AutoLoginComponent},
    { path: 'myAccount', component: MyAccountComponent, canActivate: [AuthGuard]},
    { path: 'purchase', component: PurchaseComponent, canActivate: [AuthGuard]},
    { path: 'stickershop', component: StickershopComponent, canActivate: [AuthGuard]},
    { path: 'processing/:msisdn', component: ProcessingComponent},
    { path: 'thankyou', component: ThankyouComponent},
    { path: 'purchasemessage/:message', component: PurchaseMessageComponent},
    { path: 'rates', component: RatesComponent},
    { path: 'cards', component: CardsComponent, canActivate: [AuthGuard]},
    { path: 'history', component: HistoryComponent, canActivate: [AuthGuard]},
    { path: 'inappPurchase', component: InappPurchaseComponent},
    { path: '', component: MyAccountComponent, canActivate: [AuthGuard]},
    { path: '**', component: LoginComponent}
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);