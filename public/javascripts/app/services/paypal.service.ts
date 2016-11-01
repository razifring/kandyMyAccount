import {HttpClient} from '../utils/http-client';
import 'rxjs/add/operator/map';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {CommonService} from "./common.service";
import {UserService} from "./user.service";

@Injectable()
export class PaypalService {

    constructor(
        private _http: HttpClient,
        private userService: UserService
    ){}

    createPaypalPayment(packageId): Observable<any> {
        return this._http
            .addJsonContentType()
            .post('/api/paypal/', {packageId: packageId, msisdn: this.userService.getCurrentUser().msisdn}, {})
            .map(CommonService.extractData);
    }

    executePayment(msisdn, paymentId, payerId){
        return this._http
            .addJsonContentType()
            .post('/api/paypal/execute', {msisdn:msisdn, paymentId: paymentId, payerId:payerId}, {})
            .map(CommonService.extractData);
    }

}