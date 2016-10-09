import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {AuthService} from "../services/auth.service";

@Injectable()
export class HttpClient {
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
        return this.http.post(url, data, options);
    }
}