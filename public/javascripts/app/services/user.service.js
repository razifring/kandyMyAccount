System.register(["rxjs/Rx"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Rx_1;
    var UserService;
    return {
        setters:[
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            }],
        execute: function() {
            /**
             * Created by razih on 10/6/2016.
             */
            UserService = class UserService {
                setCurrentUser(user) {
                    if (!this.currentUser) {
                        this.currentUser = new Rx_1.BehaviorSubject(user);
                    }
                    else {
                        this.currentUser.next(user);
                    }
                    return this;
                }
                /**
                 *
                 * @returns boolean | BehaviorSubject<User>
                 */
                getCurrentUser() {
                    return this.currentUser;
                }
                resetUser() {
                    if (this.currentUser) {
                        this.currentUser.next(false);
                    }
                }
            };
            exports_1("UserService", UserService);
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXNlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O1lBRUE7O2VBRUc7WUFFSDtnQkFJVyxjQUFjLENBQUMsSUFBVTtvQkFDNUIsRUFBRSxDQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUEsQ0FBQzt3QkFDbEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLG9CQUFlLENBQU8sSUFBSSxDQUFDLENBQUM7b0JBQ3ZELENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ0osSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ2hDLENBQUM7b0JBRUQsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDaEIsQ0FBQztnQkFFRDs7O21CQUdHO2dCQUNILGNBQWM7b0JBQ1YsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7Z0JBQzVCLENBQUM7Z0JBRUQsU0FBUztvQkFDTCxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUEsQ0FBQzt3QkFDakIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ2pDLENBQUM7Z0JBQ0wsQ0FBQztZQUNMLENBQUM7WUEzQkQscUNBMkJDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1VzZXJ9IGZyb20gXCIuLi9kYXRhT2JqZWN0cy91c2VyXCI7XHJcbmltcG9ydCB7QmVoYXZpb3JTdWJqZWN0fSBmcm9tIFwicnhqcy9SeFwiO1xyXG4vKipcclxuICogQ3JlYXRlZCBieSByYXppaCBvbiAxMC82LzIwMTYuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIFVzZXJTZXJ2aWNlIHtcclxuXHJcbiAgICBwcml2YXRlIGN1cnJlbnRVc2VyO1xyXG5cclxuICAgIHB1YmxpYyBzZXRDdXJyZW50VXNlcih1c2VyOiBVc2VyKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuY3VycmVudFVzZXIpe1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRVc2VyID0gbmV3IEJlaGF2aW9yU3ViamVjdDxVc2VyPih1c2VyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRVc2VyLm5leHQodXNlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyBib29sZWFuIHwgQmVoYXZpb3JTdWJqZWN0PFVzZXI+XHJcbiAgICAgKi9cclxuICAgIGdldEN1cnJlbnRVc2VyKCkgOiBCZWhhdmlvclN1YmplY3Q8VXNlcj57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudFVzZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzZXRVc2VyKCkgOiB2b2lkIHtcclxuICAgICAgICBpZih0aGlzLmN1cnJlbnRVc2VyKXtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50VXNlci5uZXh0KGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=