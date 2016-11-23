import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {AuthService} from "../services/auth.service";
import {CommonUtils} from "./commonUtils";

@Injectable()
export class HttpClient {
    useJsonContentType = false;
    constructor(
        private http: Http,
        private authService: AuthService
    ) {
    }

    createAuthorizationHeader(headers:Headers) {
        headers.append('Authorization', this.authService.getToken());
    }

    get(url) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.get(url, {
            headers: headers
        }).catch(e => {
            if(e.status === 401){
                CommonUtils.redirectTo('/login');
            }
        });
    }

    post(url, data, options) {
        if(!options){
            var options;
        }

        if(!options.headers) {
            options.headers = new Headers();
        }

        this.createAuthorizationHeader(options.headers);
        if(this.useJsonContentType){
            options.headers.append('Content-Type', 'application/json');
            this.useJsonContentType = false;
        }
        return this.http.post(url, data, options)
            .catch(e => {
                if(e.status === 401){
                    CommonUtils.redirectTo('/login');
                }
            });
    }

    put(url, data, options) {
        if(!options){
            var options;
        }

        if(!options.headers) {
            options.headers = new Headers();
        }

        this.createAuthorizationHeader(options.headers);
        if(this.useJsonContentType){
            options.headers.append('Content-Type', 'application/json');
            this.useJsonContentType = false;
        }
        return this.http.put(url, data, options).catch(e => {
            if(e.status === 401){
                CommonUtils.redirectTo('/login');
            }
        });
    }

    addJsonContentType(){
        this.useJsonContentType = true;
        return this;
    }
}