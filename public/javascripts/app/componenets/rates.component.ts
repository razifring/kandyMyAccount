import {Component, OnInit} from '@angular/core';
import {PackagesService} from '../services/packages.service';
import {Rates} from "../utils/rates";

@Component({
    templateUrl: 'templates/rates.html',
    providers: [PackagesService]
})

export class RatesComponent implements OnInit{

    rateList = [];
    currentRate;

    constructor(
        private rates: Rates
    ){}

    ngOnInit(): void {
        this.rateList = this.rates.getRates();
        this.currentRate = this.rateList[0];

    }

}