"use strict";
var Rx_1 = require("rxjs/Rx");
/**
 * Created by razih on 10/6/2016.
 */
var UserService = (function () {
    function UserService() {
    }
    UserService.prototype.setCurrentUser = function (user) {
        if (!this.currentUser) {
            this.currentUser = new Rx_1.BehaviorSubject(user);
        }
        else {
            this.currentUser.next(user);
        }
        return this;
    };
    /**
     *
     * @returns boolean | BehaviorSubject<User>
     */
    UserService.prototype.getCurrentUser = function () {
        return this.currentUser;
    };
    UserService.prototype.resetUser = function () {
        if (this.currentUser) {
            this.currentUser.next(false);
        }
    };
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map