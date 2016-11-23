System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var CommonService;
    return {
        setters:[],
        execute: function() {
            CommonService = class CommonService {
                static extractData(res) {
                    let body = res.json();
                    return body || {};
                }
                static deleteCookie(name) {
                }
            };
            exports_1("CommonService", CommonService);
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb21tb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O1lBRUE7Z0JBQ0ksT0FBYyxXQUFXLENBQUMsR0FBYTtvQkFDbkMsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO29CQUN0QixNQUFNLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztnQkFDdEIsQ0FBQztnQkFFRCxPQUFjLFlBQVksQ0FBQyxJQUFJO2dCQUcvQixDQUFDO1lBQ0wsQ0FBQztZQVZELHlDQVVDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1Jlc3BvbnNlfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuXHJcbmV4cG9ydCBjbGFzcyBDb21tb25TZXJ2aWNlIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgZXh0cmFjdERhdGEocmVzOiBSZXNwb25zZSkge1xyXG4gICAgICAgIGxldCBib2R5ID0gcmVzLmpzb24oKTtcclxuICAgICAgICByZXR1cm4gYm9keSB8fCB7fTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGRlbGV0ZUNvb2tpZShuYW1lKVxyXG4gICAge1xyXG5cclxuICAgIH1cclxufSJdfQ==