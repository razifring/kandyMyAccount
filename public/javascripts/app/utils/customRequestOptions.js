"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var http_1 = require("@angular/http");
/**
 * Extending BaseRequestOptions to inject common headers to all requests.
 */
var CustomRequestOptions = (function (_super) {
    __extends(CustomRequestOptions, _super);
    function CustomRequestOptions(authService) {
        _super.call(this);
        this.authService = authService;
        this.headers.append('Authorization', authService.token);
    }
    return CustomRequestOptions;
}(http_1.BaseRequestOptions));
exports.CustomRequestOptions = CustomRequestOptions;
//# sourceMappingURL=customRequestOptions.js.map