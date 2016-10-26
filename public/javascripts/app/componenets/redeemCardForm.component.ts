import { Component } from '@angular/core';
import {CardModel} from "../models/cardModel";
import {PackagesService} from "../services/packages.service";

@Component({
    selector: 'redeem-card-form',
    templateUrl: 'templates/redeem-card-form.html',
    providers: [PackagesService]
})
export class RedeemCardFormComponent {
    model = new CardModel('','','');
    submitted:boolean = false;
    processing:boolean = false;
    successResponse:string;


    constructor(
        private packagesService: PackagesService
    ){}


    onSubmit() {
        this.submitted = true;
        this.processing = true;


        let cardNum = this.model.getNumber();
        this.packagesService.redeemCard(cardNum)
            .subscribe(
                res => {
                    this.processing = false;
                    this.successResponse = 'You have redeemed the card successfully.'
                    this.model.reset();
                }
            );
    }
    // TODO: Remove this when we're done
    // get diagnostic() { return JSON.stringify(this.model); }
}