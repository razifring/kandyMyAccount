"use strict";
var User = (function () {
    function User() {
    }
    User.create = function (_msisdn) {
        var model = new User();
        model.msisdn = _msisdn;
        return model;
    };
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map