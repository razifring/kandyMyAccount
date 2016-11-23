System.register(['../utils/http-client', 'rxjs/add/operator/map', "@angular/core", "./common.service", "./user.service"], function(exports_1, context_1) {
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
    var HistoryService;
    return {
        setters:[
            function (http_client_1_1) {
                http_client_1 = http_client_1_1;
            },
            function (_1) {},
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
            HistoryService = class HistoryService {
                constructor(_http, userService) {
                    this._http = _http;
                    this.userService = userService;
                }
                getHistory(type, start, end) {
                    return this._http.get('/api/history/' +
                        this.userService.getCurrentUser().getValue().msisdn + '/' +
                        type + '/' +
                        start + '/' +
                        end).map(common_service_1.CommonService.extractData);
                }
            };
            HistoryService = __decorate([
                core_1.Injectable(), 
                __metadata('design:paramtypes', [http_client_1.HttpClient, user_service_1.UserService])
            ], HistoryService);
            exports_1("HistoryService", HistoryService);
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yeS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaGlzdG9yeS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQU9BO2dCQUlJLFlBQ1ksS0FBaUIsRUFDakIsV0FBd0I7b0JBRHhCLFVBQUssR0FBTCxLQUFLLENBQVk7b0JBQ2pCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO2dCQUNsQyxDQUFDO2dCQUVILFVBQVUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUc7b0JBRXZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxlQUFlO3dCQUNqQyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQU0sR0FBRyxHQUFHO3dCQUN6RCxJQUFJLEdBQUcsR0FBRzt3QkFDVixLQUFLLEdBQUcsR0FBRzt3QkFDWCxHQUFHLENBQ04sQ0FBQyxHQUFHLENBQUMsOEJBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFFckMsQ0FBQztZQUVMLENBQUM7WUFyQkQ7Z0JBQUMsaUJBQVUsRUFBRTs7OEJBQUE7WUFDYiwyQ0FvQkMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SHR0cENsaWVudH0gZnJvbSAnLi4vdXRpbHMvaHR0cC1jbGllbnQnO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21hcCc7XHJcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHtDb21tb25TZXJ2aWNlfSBmcm9tIFwiLi9jb21tb24uc2VydmljZVwiO1xyXG5pbXBvcnQge1VzZXJTZXJ2aWNlfSBmcm9tIFwiLi91c2VyLnNlcnZpY2VcIjtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEhpc3RvcnlTZXJ2aWNlIHtcclxuXHJcbiAgICBwdWJsaWMgYWN0aXZlUGFja2FnZXM7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBfaHR0cDogSHR0cENsaWVudCxcclxuICAgICAgICBwcml2YXRlIHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSxcclxuICAgICl7fVxyXG5cclxuICAgIGdldEhpc3RvcnkodHlwZSwgc3RhcnQsIGVuZCkge1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5nZXQoJy9hcGkvaGlzdG9yeS8nICtcclxuICAgICAgICAgICAgdGhpcy51c2VyU2VydmljZS5nZXRDdXJyZW50VXNlcigpLmdldFZhbHVlKCkubXNpc2RuICsgJy8nICtcclxuICAgICAgICAgICAgdHlwZSArICcvJyArXHJcbiAgICAgICAgICAgIHN0YXJ0ICsgJy8nICtcclxuICAgICAgICAgICAgZW5kXHJcbiAgICAgICAgKS5tYXAoQ29tbW9uU2VydmljZS5leHRyYWN0RGF0YSk7XHJcblxyXG4gICAgfVxyXG5cclxufSJdfQ==