System.register(['@angular/core', '@angular/http', 'rxjs/Rx', 'rxjs/add/operator/map', "@angular/router", "../dataObjects/user", "./user.service", "angular2-cookie/services/cookies.service"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, Rx_1, router_1, user_1, user_service_1, cookies_service_1;
    var AuthService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            },
            function (_1) {},
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (cookies_service_1_1) {
                cookies_service_1 = cookies_service_1_1;
            }],
        execute: function() {
            let AuthService_1 = class AuthService {
                constructor(router, http, userService, cookieService) {
                    this.router = router;
                    this.http = http;
                    this.userService = userService;
                    this.cookieService = cookieService;
                    this.token = '';
                    this.isLoggedIn = new Rx_1.BehaviorSubject(false);
                    this.webview = false;
                    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
                    if (currentUser) {
                        this.userService.setCurrentUser(user_1.User.create(currentUser.msisdn, currentUser.isPremium));
                    }
                    // set token if saved in local storage
                    this.token = currentUser && currentUser.token;
                    this.isLoggedIn.next(AuthService_1.checkLoggedIn());
                }
                sendOtp(phonenumber) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    var options = {
                        headers: headers
                    };
                    return this.http.post('/api/otp', JSON.stringify({ phonenumber: phonenumber }), options)
                        .map((response) => {
                        var result = response.json();
                        let status = result && result.status;
                        if (status) {
                            localStorage.setItem('msisdn', phonenumber);
                            return true;
                        }
                        else {
                            return response.json().err;
                        }
                    });
                }
                validateOtp(otp, countryCode, phonenumber) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    var options = {
                        headers: headers
                    };
                    var params = {
                        otp: otp,
                        countryCode: countryCode,
                        phonenumber: phonenumber
                    };
                    return this.http.post('/api/auth/login', JSON.stringify(params), options)
                        .map((response) => {
                        var result = response.json();
                        let status = result && result.status;
                        if (status) {
                            // set token property
                            var msisdn = localStorage.getItem('msisdn');
                            // store username and token in local storage to keep user logged in between page refreshes
                            localStorage.setItem('currentUser', JSON.stringify({ msisdn: msisdn, isPremium: result.body.isPremium }));
                            this.userService.setCurrentUser(user_1.User.create(msisdn, result.body.isPremium));
                            this.isLoggedIn.next(true);
                            // return true to indicate successful login
                            return true;
                        }
                        else {
                            // return false to indicate failed login
                            return false;
                        }
                    });
                }
                logout() {
                    // clear token remove user from local storage to log user out
                    this.token = null;
                    localStorage.removeItem('currentUser');
                    localStorage.removeItem('msisdn');
                    this.router.navigate(['/login']);
                    this.cookieService.remove('userSession');
                    this.userService.resetUser();
                    this.isLoggedIn.next(false);
                }
                static checkLoggedIn() {
                    return !!localStorage.getItem('currentUser');
                }
                getToken() {
                    return this.token;
                }
                autologin(msisdn, userAccessToken) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    var options = {
                        headers: headers
                    };
                    return this.http
                        .post('/api/auth/autologin', { msisdn: msisdn, userAccessToken: userAccessToken }, options)
                        .map((response) => {
                        var result = response.json();
                        this.webview = true;
                        let status = result && result.status;
                        if (status) {
                            // set token property
                            var msisdn = result.body.userId;
                            // store username and token in local storage to keep user logged in between page refreshes
                            localStorage.setItem('currentUser', JSON.stringify({ msisdn: msisdn, isPremium: result.body.isPremium }));
                            this.userService.setCurrentUser(user_1.User.create(msisdn, result.body.isPremium));
                            this.isLoggedIn.next(true);
                            // return true to indicate successful login
                            return result;
                        }
                        else {
                            // return false to indicate failed login
                            return result;
                        }
                    });
                }
            };
            let AuthService = AuthService_1;
            AuthService = AuthService_1 = __decorate([
                core_1.Injectable(), 
                __metadata('design:paramtypes', [router_1.Router, http_1.Http, user_service_1.UserService, cookies_service_1.CookieService])
            ], AuthService);
            exports_1("AuthService", AuthService);
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXV0aC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQVdBO2dCQU1JLFlBQ1ksTUFBYyxFQUNkLElBQVUsRUFDVixXQUF3QixFQUN4QixhQUE0QjtvQkFINUIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtvQkFDZCxTQUFJLEdBQUosSUFBSSxDQUFNO29CQUNWLGdCQUFXLEdBQVgsV0FBVyxDQUFhO29CQUN4QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtvQkFUakMsVUFBSyxHQUFXLEVBQUUsQ0FBQztvQkFDbkIsZUFBVSxHQUFHLElBQUksb0JBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztvQkFDakQsWUFBTyxHQUFHLEtBQUssQ0FBQztvQkFTbkIsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7b0JBQ2xFLEVBQUUsQ0FBQSxDQUFDLFdBQVcsQ0FBQyxDQUNmLENBQUM7d0JBQ0csSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsV0FBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO29CQUM1RixDQUFDO29CQUNELHNDQUFzQztvQkFDdEMsSUFBSSxDQUFDLEtBQUssR0FBRyxXQUFXLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQztvQkFDOUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBVyxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7Z0JBQ3RELENBQUM7Z0JBRUQsT0FBTyxDQUFDLFdBQVc7b0JBQ2YsSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLEVBQUUsQ0FBQztvQkFDNUIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUs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OzRCQUNyQixJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQzs0QkFDaEMsMEZBQTBGOzRCQUMxRixZQUFZLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3hHLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLFdBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzs0QkFDNUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQzNCLDJDQUEyQzs0QkFDM0MsTUFBTSxDQUFDLE1BQU0sQ0FBQzt3QkFDbEIsQ0FBQzt3QkFBQyxJQUFJLENBQUMsQ0FBQzs0QkFDSix3Q0FBd0M7NEJBQ3hDLE1BQU0sQ0FBQyxNQUFNLENBQUM7d0JBQ2xCLENBQUM7b0JBQ0wsQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsQ0FBQztZQUVMLENBQUM7O1lBL0hEO2dCQUFDLGlCQUFVLEVBQUU7OzJCQUFBO1lBQ2IscUNBOEhDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHAsIEhlYWRlcnMsIFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XHJcbmltcG9ydCB7QmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlfSBmcm9tICdyeGpzL1J4JztcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tYXAnO1xyXG5pbXBvcnQge1JvdXRlcn0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQge1VzZXJ9IGZyb20gXCIuLi9kYXRhT2JqZWN0cy91c2VyXCI7XHJcbmltcG9ydCB7VXNlclNlcnZpY2V9IGZyb20gXCIuL3VzZXIuc2VydmljZVwiO1xyXG5pbXBvcnQge0Nvb2tpZVNlcnZpY2V9IGZyb20gXCJhbmd1bGFyMi1jb29raWUvc2VydmljZXMvY29va2llcy5zZXJ2aWNlXCI7XHJcblxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQXV0aFNlcnZpY2Uge1xyXG4gICAgcHVibGljIHRva2VuOiBzdHJpbmcgPSAnJztcclxuICAgIHB1YmxpYyBpc0xvZ2dlZEluID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XHJcbiAgICBwdWJsaWMgd2VidmlldyA9IGZhbHNlO1xyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxyXG4gICAgICAgIHByaXZhdGUgaHR0cDogSHR0cCxcclxuICAgICAgICBwcml2YXRlIHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIGNvb2tpZVNlcnZpY2U6IENvb2tpZVNlcnZpY2VcclxuICAgICkge1xyXG4gICAgICAgIHZhciBjdXJyZW50VXNlciA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJykpO1xyXG4gICAgICAgIGlmKGN1cnJlbnRVc2VyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy51c2VyU2VydmljZS5zZXRDdXJyZW50VXNlcihVc2VyLmNyZWF0ZShjdXJyZW50VXNlci5tc2lzZG4sIGN1cnJlbnRVc2VyLmlzUHJlbWl1bSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBzZXQgdG9rZW4gaWYgc2F2ZWQgaW4gbG9jYWwgc3RvcmFnZVxyXG4gICAgICAgIHRoaXMudG9rZW4gPSBjdXJyZW50VXNlciAmJiBjdXJyZW50VXNlci50b2tlbjtcclxuICAgICAgICB0aGlzLmlzTG9nZ2VkSW4ubmV4dChBdXRoU2VydmljZS5jaGVja0xvZ2dlZEluKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbmRPdHAocGhvbmVudW1iZXIpe1xyXG4gICAgICAgIHZhciBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcclxuICAgICAgICBoZWFkZXJzLmFwcGVuZCgnQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcclxuICAgICAgICB2YXIgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgaGVhZGVyczogaGVhZGVyc1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KCcvYXBpL290cCcsIEpTT04uc3RyaW5naWZ5KHsgcGhvbmVudW1iZXI6IHBob25lbnVtYmVyfSksIG9wdGlvbnMpXHJcbiAgICAgICAgICAgIC5tYXAoKHJlc3BvbnNlOiBSZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICAgICAgICAgIGxldCBzdGF0dXMgPSByZXN1bHQgJiYgcmVzdWx0LnN0YXR1cztcclxuICAgICAgICAgICAgICAgIGlmKHN0YXR1cylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbXNpc2RuJywgcGhvbmVudW1iZXIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpLmVycjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFsaWRhdGVPdHAob3RwLCBjb3VudHJ5Q29kZSwgcGhvbmVudW1iZXIpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcclxuICAgICAgICB2YXIgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XHJcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnNcclxuICAgICAgICB9O1xyXG4gICAgICAgIHZhciBwYXJhbXMgPSB7XHJcbiAgICAgICAgICAgIG90cDogb3RwLFxyXG4gICAgICAgICAgICBjb3VudHJ5Q29kZTogY291bnRyeUNvZGUsXHJcbiAgICAgICAgICAgIHBob25lbnVtYmVyOiBwaG9uZW51bWJlclxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCgnL2FwaS9hdXRoL2xvZ2luJywgSlNPTi5zdHJpbmdpZnkocGFyYW1zKSwgb3B0aW9ucylcclxuICAgICAgICAgICAgLm1hcCgocmVzcG9uc2U6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0YXR1cyA9IHJlc3VsdCAmJiByZXN1bHQuc3RhdHVzO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBzZXQgdG9rZW4gcHJvcGVydHlcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbXNpc2RuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ21zaXNkbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHN0b3JlIHVzZXJuYW1lIGFuZCB0b2tlbiBpbiBsb2NhbCBzdG9yYWdlIHRvIGtlZXAgdXNlciBsb2dnZWQgaW4gYmV0d2VlbiBwYWdlIHJlZnJlc2hlc1xyXG4gICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjdXJyZW50VXNlcicsIEpTT04uc3RyaW5naWZ5KHsgbXNpc2RuOiBtc2lzZG4sIGlzUHJlbWl1bTpyZXN1bHQuYm9keS5pc1ByZW1pdW19KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51c2VyU2VydmljZS5zZXRDdXJyZW50VXNlcihVc2VyLmNyZWF0ZShtc2lzZG4sIHJlc3VsdC5ib2R5LmlzUHJlbWl1bSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNMb2dnZWRJbi5uZXh0KHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHJldHVybiB0cnVlIHRvIGluZGljYXRlIHN1Y2Nlc3NmdWwgbG9naW5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcmV0dXJuIGZhbHNlIHRvIGluZGljYXRlIGZhaWxlZCBsb2dpblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9nb3V0KCk6IHZvaWQge1xyXG4gICAgICAgIC8vIGNsZWFyIHRva2VuIHJlbW92ZSB1c2VyIGZyb20gbG9jYWwgc3RvcmFnZSB0byBsb2cgdXNlciBvdXRcclxuICAgICAgICB0aGlzLnRva2VuID0gbnVsbDtcclxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnY3VycmVudFVzZXInKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnbXNpc2RuJyk7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvbG9naW4nXSk7XHJcbiAgICAgICAgdGhpcy5jb29raWVTZXJ2aWNlLnJlbW92ZSgndXNlclNlc3Npb24nKTtcclxuICAgICAgICB0aGlzLnVzZXJTZXJ2aWNlLnJlc2V0VXNlcigpO1xyXG4gICAgICAgIHRoaXMuaXNMb2dnZWRJbi5uZXh0KGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBjaGVja0xvZ2dlZEluKCk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuICEhbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VG9rZW4oKTpzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9rZW47XHJcbiAgICB9XHJcblxyXG4gICAgYXV0b2xvZ2luKG1zaXNkbiwgdXNlckFjY2Vzc1Rva2VuKSA6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICAgICAgdmFyIGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xyXG4gICAgICAgIHZhciBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgICAgICAgIC5wb3N0KCcvYXBpL2F1dGgvYXV0b2xvZ2luJywge21zaXNkbjptc2lzZG4sIHVzZXJBY2Nlc3NUb2tlbjogdXNlckFjY2Vzc1Rva2VufSwgb3B0aW9ucylcclxuICAgICAgICAgICAgLm1hcCgocmVzcG9uc2U6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy53ZWJ2aWV3ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGxldCBzdGF0dXMgPSByZXN1bHQgJiYgcmVzdWx0LnN0YXR1cztcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc2V0IHRva2VuIHByb3BlcnR5XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1zaXNkbiA9IHJlc3VsdC5ib2R5LnVzZXJJZDtcclxuICAgICAgICAgICAgICAgICAgICAvLyBzdG9yZSB1c2VybmFtZSBhbmQgdG9rZW4gaW4gbG9jYWwgc3RvcmFnZSB0byBrZWVwIHVzZXIgbG9nZ2VkIGluIGJldHdlZW4gcGFnZSByZWZyZXNoZXNcclxuICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY3VycmVudFVzZXInLCBKU09OLnN0cmluZ2lmeSh7IG1zaXNkbjogbXNpc2RuLCBpc1ByZW1pdW06cmVzdWx0LmJvZHkuaXNQcmVtaXVtfSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXNlclNlcnZpY2Uuc2V0Q3VycmVudFVzZXIoVXNlci5jcmVhdGUobXNpc2RuLCByZXN1bHQuYm9keS5pc1ByZW1pdW0pKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzTG9nZ2VkSW4ubmV4dCh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyByZXR1cm4gdHJ1ZSB0byBpbmRpY2F0ZSBzdWNjZXNzZnVsIGxvZ2luXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcmV0dXJuIGZhbHNlIHRvIGluZGljYXRlIGZhaWxlZCBsb2dpblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufSJdfQ==