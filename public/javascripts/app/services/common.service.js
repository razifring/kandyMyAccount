"use strict";
var CommonService = (function () {
    function CommonService() {
    }
    CommonService.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    CommonService.deleteCookie = function (name) {
    };
    return CommonService;
}());
exports.CommonService = CommonService;
//# sourceMappingURL=common.service.js.map