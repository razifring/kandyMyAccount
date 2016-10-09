import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule, JsonpModule, RequestOptions} from '@angular/http';
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
import {CustomRequestOptions} from "./utils/customRequestOptions"
import {HttpClient} from "./utils/http-client";
import {SelectPackagesComponent} from "./componenets/selectPackages.component";


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        routing
    ],
    providers: [
        AuthGuard,
        HttpClient,
        AuthService,
        UserService,

    ],
    declarations: [
        AppComponent,
        LoginComponent,
        MyAccountComponent,
        NavBarComponent,
        PurchaseComponent,
        ListPackagesComponent,
        SelectPackagesComponent

    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
