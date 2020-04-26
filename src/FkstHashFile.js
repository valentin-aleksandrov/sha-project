"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var fileSystem = tslib_1.__importStar(require("fs"));
var algorithm_1 = require("./algorithm");
var FkstHashFile = /** @class */ (function () {
    function FkstHashFile() {
        this.hash = function (filePath) {
            return algorithm_1.hash(fileSystem.readFileSync(filePath, 'utf8'));
        };
    }
    return FkstHashFile;
}());
exports.FkstHashFile = FkstHashFile;
