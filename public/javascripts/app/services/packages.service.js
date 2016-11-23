System.register(['../utils/http-client', "@angular/core", "./common.service", "./user.service"], function(exports_1, context_1) {
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
    var http_client_1, core_1, common_service_1, user_service_1;
    var PackagesService;
    return {
        setters:[
            function (http_client_1_1) {
                http_client_1 = http_client_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_service_1_1) {
                common_service_1 = common_service_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            }],
        execute: function() {
            PackagesService = class PackagesService {
                constructor(_http, userService) {
                    this._http = _http;
                    this.userService = userService;
                }
                getActivePackages() {
                    return this._http.get('/api/packages/' + this.userService.getCurrentUser().getValue().msisdn)
                        .map(common_service_1.CommonService.extractData);
                }
                getPurchsablePackages() {
                    return this._http.get('/api/packages/')
                        .map(common_service_1.CommonService.extractData);
                }
                redeemCard(cardNum) {
                    return this._http
                        .addJsonContentType()
                        .post('/api/cards', { cardNumber: cardNum }, {})
                        .map(common_service_1.CommonService.extractData);
                }
            };
            PackagesService = __decorate([
                core_1.Injectable(), 
                __metadata('design:paramtypes', [http_client_1.HttpClient, user_service_1.UserService])
            ], PackagesService);
            exports_1("PackagesService", PackagesService);
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2FnZXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBhY2thZ2VzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFRQTtnQkFFSSxZQUNZLEtBQWlCLEVBQ2pCLFdBQXdCO29CQUR4QixVQUFLLEdBQUwsS0FBSyxDQUFZO29CQUNqQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtnQkFDbEMsQ0FBQztnQkFFSCxpQkFBaUI7b0JBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGdCQUFnQixHQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxDQUFDO3lCQUN0RixHQUFHLENBQUMsOEJBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDeEMsQ0FBQztnQkFFRCxxQkFBcUI7b0JBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQzt5QkFDbEMsR0FBRyxDQUFDLDhCQUFhLENBQUMsV0FBVyxDQUFDLENBQUE7Z0JBQ3ZDLENBQUM7Z0JBRUQsVUFBVSxDQUFDLE9BQWU7b0JBQ3RCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSzt5QkFDWixrQkFBa0IsRUFBRTt5QkFDcEIsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUMsRUFBRSxFQUFFLENBQUM7eUJBQzdDLEdBQUcsQ0FBQyw4QkFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUN4QyxDQUFDO1lBRUwsQ0FBQztZQXpCRDtnQkFBQyxpQkFBVSxFQUFFOzsrQkFBQTtZQUNiLDZDQXdCQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtIdHRwQ2xpZW50fSBmcm9tICcuLi91dGlscy9odHRwLWNsaWVudCc7XHJcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XHJcbmltcG9ydCB7Q29tbW9uU2VydmljZX0gZnJvbSBcIi4vY29tbW9uLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtVc2VyU2VydmljZX0gZnJvbSBcIi4vdXNlci5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7UmVwbGF5U3ViamVjdH0gZnJvbSBcInJ4anMvUmVwbGF5U3ViamVjdFwiO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgUGFja2FnZXNTZXJ2aWNlIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIF9odHRwOiBIdHRwQ2xpZW50LFxyXG4gICAgICAgIHByaXZhdGUgdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlXHJcbiAgICApe31cclxuXHJcbiAgICBnZXRBY3RpdmVQYWNrYWdlcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5nZXQoJy9hcGkvcGFja2FnZXMvJyt0aGlzLnVzZXJTZXJ2aWNlLmdldEN1cnJlbnRVc2VyKCkuZ2V0VmFsdWUoKS5tc2lzZG4pXHJcbiAgICAgICAgICAgIC5tYXAoQ29tbW9uU2VydmljZS5leHRyYWN0RGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UHVyY2hzYWJsZVBhY2thZ2VzKCk6IE9ic2VydmFibGU8YW55PntcclxuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5nZXQoJy9hcGkvcGFja2FnZXMvJylcclxuICAgICAgICAgICAgLm1hcChDb21tb25TZXJ2aWNlLmV4dHJhY3REYXRhKVxyXG4gICAgfVxyXG5cclxuICAgIHJlZGVlbUNhcmQoY2FyZE51bTogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHBcclxuICAgICAgICAgICAgLmFkZEpzb25Db250ZW50VHlwZSgpXHJcbiAgICAgICAgICAgIC5wb3N0KCcvYXBpL2NhcmRzJywge2NhcmROdW1iZXI6IGNhcmROdW19LCB7fSlcclxuICAgICAgICAgICAgLm1hcChDb21tb25TZXJ2aWNlLmV4dHJhY3REYXRhKTtcclxuICAgIH1cclxuXHJcbn0iXX0=