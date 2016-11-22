import * as _ from 'lodash';

import {Component, OnInit} from '@angular/core';
import {PackagesService} from "../services/packages.service";
import {PaypalService} from "../services/paypal.service";
import {CommonUtils} from "../utils/commonUtils";
import {StickerService} from "../services/sticker.service";
import {StickerCodes} from "../utils/stickerPackageCode";


@Component({
    templateUrl: 'templates/stickershop.html',
    providers: [PackagesService,StickerService]
})

export class StickershopComponent implements OnInit{
    stickerpackages = {};


    constructor(
        private stickerService: StickerService,
        private stickerCodes: StickerCodes) { }


    ngOnInit(): void {
        var sticker = this.stickerCodes.getStickerCodes();
        this.stickerpackages = sticker.packages;


    }

    goToPaypal(stickerid){
        console.log(stickerid)
        this.stickerService.assignSticker(stickerid)
            .subscribe(
                res => {
                    if(res.status) {
                        CommonUtils.redirectTo(res.body.redirectUrl)
                    } else {
                    }

                },
                res => {
                }
            );
    }




}