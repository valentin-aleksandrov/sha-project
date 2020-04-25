"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var index_1 = require("./index");
/**
 * Some predefined delays (in milliseconds).
 */
var Delays;
(function (Delays) {
    Delays[Delays["Short"] = 500] = "Short";
    Delays[Delays["Medium"] = 2000] = "Medium";
    Delays[Delays["Long"] = 5000] = "Long";
})(Delays = exports.Delays || (exports.Delays = {}));
/**
 * Returns a Promise<string> that resolves after given time.
 *
 * @param {string} name - A name.
 * @param {number=} [delay=Delays.Medium] - Number of milliseconds to delay resolution of the Promise.
 * @returns {Promise<string>}
 */
function delayedHello(name, delay) {
    if (delay === void 0) { delay = Delays.Medium; }
    return new Promise(function (resolve) {
        return setTimeout(function () { return resolve("Hello, " + name); }, delay);
    });
}
// Below are examples of using ESLint errors suppression
// Here it is suppressing missing return type definitions for greeter function
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function greeter(name) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, delayedHello(name, Delays.Long)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.greeter = greeter;
index_1.application();
