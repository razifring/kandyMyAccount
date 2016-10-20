import {Component, OnInit} from '@angular/core';
import {PackagesService} from "../services/packages.service";
import {Router, ActivatedRoute} from '@angular/router';
import {PaypalService} from "../services/paypal.service";
import {Subscription} from "rxjs";

@Component({
    templateUrl: 'templates/thankyou.html',
    providers: [PackagesService]
})

export class ThankyouComponent {
    
    constructor(
    ){}

}