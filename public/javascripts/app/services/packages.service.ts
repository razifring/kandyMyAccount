import {HttpClient} from '../utils/http-client';
import 'rxjs/add/operator/map';
import {Injectable} from "@angular/core";
import {Card} from '../dataObjects/card';
import {Package} from '../dataObjects/package';
import {Observable} from "rxjs/Observable";
import {CommonService} from "./common.service";
import {UserService} from "./user.service";
import {Http, Headers} from "@angular/http";

@Injectable()
export class PackagesService {

    public activePackages;

    constructor(
        private _http: HttpClient,
        private http: Http,
        private userService: UserService
    ){}

    getActivePackages() {

        return this._http.get('/api/packages/'+this.userService.getCurrentUser().getValue().msisdn)
                .map(CommonService.extractData);

    }

    getPurchsablePackages(): Observable<any>{
        let options = {withCredentials: true};
        return this.http.get('https://stickers.juanachat.com/?brand=juanachat', options).map(CommonService.extractData);
        return this._http.get('/api/packages/')
            .map(CommonService.extractData)
    }

    redeemCard(cardNum: string) {
        return this._http
            .addJsonContentType()
            .post('/api/cards', {cardNumber: cardNum}, {})
            .map(CommonService.extractData);
    }

}