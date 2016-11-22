import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {PaypalService} from "../services/paypal.service";
import {Subscription} from "rxjs";
import {Subscription} from "rxjs/Subscription";


@Component({
    templateUrl: 'templates/processing.html'
})

export class ProcessingComponent implements OnInit{
    public isProcessing: boolean;
    private subscription: Subscription;
    
    constructor(
        private paypalService: PaypalService,
        private route: ActivatedRoute,
        private router: Router
    ){}

    ngOnInit(): void {
        this.isProcessing = true;
        this.subscription = this.route.queryParams.subscribe(
            (param: any) => {
                let msisdn = this.route.snapshot.params['msisdn'];
                let paymentId = param.paymentId;
                let payerId = param.PayerID;
                if(paymentId)
                {
                    // TODO stickerservice.executeAssignSticker
                    this.paypalService.executePayment(msisdn, paymentId, payerId)
                        .subscribe(
                            res => {
                                this.isProcessing = false;
                                if(res.status){
                                    this.router.navigate(['/thankyou']);
                                } else {
                                    // TODO: display error message
                                }


                            });
                }
            });
    }

    ngOnDestroy() {
        // prevent memory leak by unsubscribing
        this.subscription.unsubscribe();
    }
}