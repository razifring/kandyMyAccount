import { Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Injectable} from "@angular/core";
import {Card} from '../dataObjects/card';
import {Package} from '../dataObjects/package';
import {Observable} from "rxjs/Observable";
import {CommonService} from "./common.service";

@Injectable()
export class PackagesService {

    constructor(private _http: Http){
        this._http = _http;
    }

    getActivePackages(): Observable<Package[]> {
        return this._http.get('/packages')
            .map(CommonService.extractData);
    }

    claimCard(card: Card){
        return this._http.post('/cards', JSON.stringify(card))
            .map(res => res.json());
    }
}