"use strict";
var CardModel = (function () {
    function CardModel(field1, field2, field3) {
        this.field1 = field1;
        this.field2 = field2;
        this.field3 = field3;
    }
    CardModel.prototype.getNumber = function () {
        return this.field1.toString() + this.field2.toString() + this.field3.toString();
    };
    CardModel.prototype.reset = function () {
        this.field1 = this.field2 = this.field3 = '';
    };
    return CardModel;
}());
exports.CardModel = CardModel;
//# sourceMappingURL=cardModel.js.map