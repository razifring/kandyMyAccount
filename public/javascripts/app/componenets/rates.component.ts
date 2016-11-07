import {Component, OnInit} from '@angular/core';
import {PackagesService} from '../services/packages.service';

@Component({
    templateUrl: 'templates/rates.html',
    providers: [PackagesService]
})

export class RatesComponent implements OnInit{

    rateList = [{name: 'alaska', value: '5.99'},{name: 'teman', value: '2.99'}];
    currentRate = this.rateList[0];

    constructor(){}

    ngOnInit(): void {

    }

}