"use strict";
var User = (function () {
    function User() {
    }
    User.create = function (_msisdn, _isPremium) {
        var model = new User();
        model.msisdn = _msisdn;
        model.isPremium = _isPremium;
        return model;
    };
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map