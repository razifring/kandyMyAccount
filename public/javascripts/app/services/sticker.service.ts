import {HttpClient} from '../utils/http-client';
import 'rxjs/add/operator/map';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {CommonService} from "./common.service";
import {UserService} from "./user.service";

@Injectable()
export class StickerService {

    public stickerPackages;
    private userAccessToken;

    constructor(
        private _http: HttpClient,
        private userService: UserService

    ){}

    getActiveStickers() {
        let  invocation = new XMLHttpRequest();
        let url ='https://stickers.juanachat.com/?brand=juanachat';

        function callOtherDomain(){
            if(invocation) {
                invocation.open('GET', url, true);
                invocation.withCredentials = true;
                invocation.onreadystatechange = function (data) {
                    console.log(data);
                };
                invocation.send();
            }
        }

            return callOtherDomain()
                //.map(CommonService.extractData);
      //  return this._http.get(Access-Control-Allow-Origin:'https://stickers.juanachat.com/?brand=juanachat')


    }


    assignSticker(stickerid): Observable<any> {
        console.log(stickerid);
        return this._http
            .addJsonContentType()
            .put('/api/stickers/', {stickerId: stickerid, msisdn: this.userService.getCurrentUser().getValue().msisdn}, {})
            .map(CommonService.extractData);
    }
/*
    public getUserAccessToken(){
       return  this._http.get('/api/stickersUat/')+this.userService.getCurrentUser().getValue().msisdn)
                .map(CommonService.extractData);

    } */

    public getUserAccessToken() {
        return this._http.get('/api/authentication/uat/'+this.userService.getCurrentUser().getValue().msisdn)
            .map(CommonService.extractData);
    }


}