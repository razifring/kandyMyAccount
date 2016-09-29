import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { AppComponent }  from './componenets/app.component';
import { routing } from './app.routing';
import {NavBarComponent} from "./componenets/navbar.component";
import {MyAccountComponent} from "./componenets/myAccount.component";
import {PurchaseComponent} from "./componenets/purchase.component";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        JsonpModule,
        routing
    ],
    declarations: [
        AppComponent,
        MyAccountComponent,
        NavBarComponent,
        PurchaseComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
