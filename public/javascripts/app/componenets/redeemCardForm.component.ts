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
        let key = event.keyCode;
        console.log(inputChar, event.keyCode);
        console.log("this is the event: "+key);
        if(key == 37 || key == 38 || key == 39 || key == 40 || key == 8 || key == 46) { // Left / Up / Right / Down Arrow, Backspace, Delete keys
            return;
        }
        if (!pattern.test(inputChar)|| event.keyCode == 8) {
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