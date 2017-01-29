import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Subscription} from "rxjs/Subscription";

@Component({
    templateUrl: 'templates/purchasemessage.html'
//    providers:[PackagesService]
})

export class PurchaseMessageComponent {
    private subscription: Subscription;
    public message;
    constructor(
        private route: ActivatedRoute,
        private router: Router
    ){}

    ngOnInit(): void {
        // this.isProcessing = true;
        this.subscription = this.route.queryParams.subscribe(
            (message) => {
                this.message = this.route.snapshot.params['message'];
                // console.log("this is the message param: "+message);
            });
    }


}