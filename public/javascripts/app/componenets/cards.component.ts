import {Component} from '@angular/core';
import {PackagesService} from "../services/packages.service";


@Component({
    templateUrl: 'templates/cards.html'
})

export class CardsComponent {
    disableBtns = true;

    constructor(
    ){}


    submitCard():void {
        this.disableBtns = true;

    }
}