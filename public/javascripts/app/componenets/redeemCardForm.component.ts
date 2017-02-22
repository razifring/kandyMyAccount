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
    errorResponse:string;


    constructor(
        private packagesService: PackagesService
    ){}


    _keyPress(event: any) {
        const pattern = /[0-9\+\-\ ]/;
        let inputChar = String.fromCharCode(event.keyCode);
             console.log(inputChar, event.keyCode);
        if (!pattern.test(inputChar)) {
            // invalid character, prevent input
            event.preventDefault();
        }
    }


    onSubmit() {
        this.submitted = true;
        this.processing = true;


        let cardNum = this.model.getNumber();
        this.packagesService.redeemCard(cardNum)
            .subscribe(
                res => {
                    this.processing = false;
                    if(res.status) {
                        this.successResponse = 'You have redeemed the card successfully.';
                        this.model.reset();
                    } else {
                        this.errorResponse = res.body.message;
                    }
                }
            );
    }

}