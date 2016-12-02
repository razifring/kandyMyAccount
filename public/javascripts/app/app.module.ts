import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule, JsonpModule} from '@angular/http';
import { AppComponent }  from './componenets/app.component';
import { routing } from './app.routing';
import {NavBarComponent} from "./componenets/navbar.component";
import {MyAccountComponent} from "./componenets/myAccount.component";
import {PurchaseComponent} from "./componenets/purchase.component";
import {StickershopComponent} from "./componenets/stickershop.component";
import {ManageAccountComponent} from "./componenets/manageAccount.component";
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
import {Ng2DeviceDetector} from 'ng2-device-detector';
import {CountryCodes} from "./utils/countryCodes";
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { CollapseModule  } from 'ng2-bootstrap/ng2-bootstrap';
import { TabsModule } from 'ng2-bootstrap/ng2-bootstrap';
import { AutoLoginComponent  } from "./componenets/autoLogin.component";
import {RatesComponent} from "./componenets/rates.component";
import {HistoryComponent} from "./componenets/history.component";
import {HistoryService} from "./services/history.service";
import {StickerService} from "./services/sticker.service";
import {StickerCodes} from "./utils/stickerPackageCode";
import {Rates} from "./utils/rates";
import {ManageAccountComponent} from "./componenets/manageAccount.component";



@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        DropdownModule,
        routing,
        CollapseModule,
        TabsModule,
        Ng2DeviceDetector
    ],
    providers: [
        AuthGuard,
        HttpClient,
        AuthService,
        UserService,
        PaypalService,
        CommonUtils,
        CountryCodes,
        Rates,
        CookieService,
        HistoryService,
        StickerService,
        StickerCodes

    ],
    declarations: [
        AppComponent,
        AutoLoginComponent,
        CardsComponent,
        HistoryComponent,
        ListPackagesComponent,
        LoginComponent,
        MyAccountComponent,
        NavBarComponent,
        PaypalButtonComponent,
        ProcessingComponent,
        PurchaseComponent,
        StickershopComponent,
        ManageAccountComponent,
        RatesComponent,
        RedeemCardFormComponent,
        SelectPackagesComponent,
        SimpleSpinnerComponent,
        SpinnerComponent,
        ThankyouComponent,
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
