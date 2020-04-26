"use strict";
exports.__esModule = true;
var algorithm_1 = require("./algorithm");
var FkstHashString = /** @class */ (function () {
    function FkstHashString() {
        this.hash = function (strToHash) {
            return algorithm_1.hash(strToHash);
        };
    }
    return FkstHashString;
}());
exports.FkstHashString = FkstHashString;
