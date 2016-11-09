"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var auth_service_1 = require("../services/auth.service");
var HttpClient = (function () {
    function HttpClient(http, authService) {
        this.http = http;
        this.authService = authService;
        this.useJsonContentType = false;
    }
    HttpClient.prototype.createAuthorizationHeader = function (headers) {
        headers.append('Authorization', this.authService.getToken());
    };
    HttpClient.prototype.get = function (url) {
        var headers = new http_1.Headers();
        this.createAuthorizationHeader(headers);
        return this.http.get(url, {
            headers: headers
        });
    };
    HttpClient.prototype.post = function (url, data, options) {
        if (!options) {
            var options;
        }
        if (!options.headers) {
            options.headers = new http_1.Headers();
        }
        this.createAuthorizationHeader(options.headers);
        if (this.useJsonContentType) {
            options.headers.append('Content-Type', 'application/json');
            this.useJsonContentType = false;
        }
        return this.http.post(url, data, options);
    };
    HttpClient.prototype.put = function (url, data, options) {
        if (!options) {
            var options;
        }
        if (!options.headers) {
            options.headers = new http_1.Headers();
        }
        this.createAuthorizationHeader(options.headers);
        if (this.useJsonContentType) {
            options.headers.append('Content-Type', 'application/json');
            this.useJsonContentType = false;
        }
        return this.http.put(url, data, options);
    };
    HttpClient.prototype.addJsonContentType = function () {
        this.useJsonContentType = true;
        return this;
    };
    HttpClient = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, auth_service_1.AuthService])
    ], HttpClient);
    return HttpClient;
}());
exports.HttpClient = HttpClient;
//# sourceMappingURL=http-client.js.map