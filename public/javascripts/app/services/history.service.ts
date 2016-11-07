import {HttpClient} from '../utils/http-client';
import 'rxjs/add/operator/map';
import {Injectable} from "@angular/core";
import {CommonService} from "./common.service";
import {UserService} from "./user.service";

@Injectable()
export class HistoryService {

    public activePackages;

    constructor(
        private _http: HttpClient,
        private userService: UserService,
    ){}

    getHistory(type, start, end) {

        return this._http.get('/api/history/' +
            this.userService.getCurrentUser().getValue().msisdn + '/' +
            type + '/' +
            start + '/' +
            end
        ).map(CommonService.extractData);

    }

}