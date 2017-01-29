import {HttpClient} from '../utils/http-client';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {CommonService} from "./common.service";
import {UserService} from "./user.service";
import {ReplaySubject} from "rxjs/ReplaySubject";

@Injectable()
export class PackagesService {

    constructor(
        private _http: HttpClient,
        private userService: UserService

    ){}

    getActivePackages() {
        return this._http.get('/api/packages/'+this.userService.getCurrentUser().getValue().msisdn)
            .map(CommonService.extractData);
    }

    getPurchsablePackages(): Observable<any>{
        return this._http.get('/api/packages/')
            .map(CommonService.extractData)
    }

    validatePackage(packageId){
        return this._http
            .addJsonContentType()
            .post('/api/packages/validate', {packageId: packageId, msisdn: this.userService.getCurrentUser().getValue().msisdn}, {})
            .map(CommonService.extractData);


    }

    redeemCard(cardNum: string) {
        return this._http
            .addJsonContentType()
            .post('/api/cards', {cardNumber: cardNum}, {})
            .map(CommonService.extractData);
    }

}