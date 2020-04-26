"use strict";
exports.__esModule = true;
var algorithm_1 = require("./algorithm");
var FkstHashConsole = /** @class */ (function () {
    function FkstHashConsole() {
        this.hash = function (strToHash) {
            return algorithm_1.hash(strToHash);
        };
    }
    return FkstHashConsole;
}());
exports.FkstHashConsole = FkstHashConsole;
