import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule, JsonpModule} from '@angular/http';
import { AppComponent }  from './componenets/app.component';
import { routing } from './app.routing';
import {NavBarComponent} from "./componenets/navbar.component";
import {MyAccountComponent} from "./componenets/myAccount.component";
import {PurchaseComponent} from "./componenets/purchase.component";
import {ListPackagesComponent} from "./componenets/listPackages.component";
import {FormsModule} from "@angular/forms";
import {LoginComponent} from "./componenets/login.component";
import {AuthGuard} from "./_guards/auth.guard";
import {AuthService} from "./services/auth.service";
import {UserService} from "./services/user.service";
import {HttpClient} from "./utils/http-client";
import {SelectPackagesComponent} from "./componenets/selectPackages.component";
import {PaypalService} from "./services/paypal.service";
import {CommonUtils} from "./utils/commonUtils";
import {ThankyouComponent} from "./componenets/thankyou.component";
import {ProcessingComponent} from "./componenets/processing.component";
import {SpinnerComponent} from "./componenets/common/spinner.component";
import {SimpleSpinnerComponent} from "./componenets/common/simpleSpinner.component";
import {PaypalButtonComponent} from "./componenets/common/paypalButton";
import {CardsComponent} from "./componenets/cards.component";
import {RedeemCardFormComponent} from "./componenets/redeemCardForm.component";
import {DropdownModule} from "ng2-dropdown";
import {CountryCodes} from "./utils/countryCodes";


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        DropdownModule,
        routing,
    ],
    providers: [
        AuthGuard,
        HttpClient,
        AuthService,
        UserService,
        PaypalService,
        CommonUtils,
        CountryCodes,

    ],
    declarations: [
        AppComponent,
        LoginComponent,
        MyAccountComponent,
        NavBarComponent,
        PurchaseComponent,
        ListPackagesComponent,
        SelectPackagesComponent,
        ThankyouComponent,
        CardsComponent,
        ProcessingComponent,
        SpinnerComponent,
        SimpleSpinnerComponent,
        PaypalButtonComponent,
        RedeemCardFormComponent

    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
