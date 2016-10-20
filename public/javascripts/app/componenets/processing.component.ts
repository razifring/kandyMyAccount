import {Component, OnInit} from '@angular/core';
import {PackagesService} from "../services/packages.service";
import {Router, ActivatedRoute} from '@angular/router';
import {PaypalService} from "../services/paypal.service";
import {Subscription} from "rxjs";
import {SpinnerComponent} from "./common/spinner.component";

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
                    this.paypalService.executePayment(msisdn, paymentId, payerId)
                        .subscribe(
                            res => {
                                this.isProcessing = false;
                                this.router.navigate(['/thankyou', {packageId: 23}]);
                            });
                }
            });
    }

    ngOnDestroy() {
        // prevent memory leak by unsubscribing
        this.subscription.unsubscribe();
    }
}