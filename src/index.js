"use strict";
exports.__esModule = true;
// import * as fileSystem from 'fs';
var ramda_1 = require("ramda");
exports.getAsciiValue = function (character) {
    return character.charCodeAt(0);
};
exports.toBinary = function (number) { return number.toString(2); };
exports.normalizeToEightBits = function (binaryValue) {
    return binaryValue.length === 8
        ? binaryValue
        : exports.normalizeToEightBits('0' + binaryValue);
};
exports.normalizeToOneHundredTwentyEightBits = function (binaryValue) {
    return binaryValue.length === 128
        ? binaryValue
        : exports.normalizeToOneHundredTwentyEightBits('0' + binaryValue);
};
exports.characterToBinary = ramda_1.compose(exports.normalizeToEightBits, exports.toBinary, exports.getAsciiValue);
exports.toOneHundredTwentyEightBitsBinary = ramda_1.compose(exports.normalizeToOneHundredTwentyEightBits, exports.toBinary);
exports.convertWordToBits = function (word) {
    return word
        .split('')
        .map(exports.characterToBinary)
        .join('');
};
exports.zerosCountInMessagePreparing = function (messageLength) {
    return 896 - messageLength - 1;
};
var getMessageModThousandTwentyFour = function (message, zeroes, lastPart) {
    var newMessage = message + '1' + zeroes + lastPart;
    return newMessage.length % 1024 === 0
        ? newMessage
        : getMessageModThousandTwentyFour(message, zeroes + '0', lastPart);
};
exports.padMessage = function (message) {
    return message.length < 896
        ? message +
            '1' +
            '0'.repeat(exports.zerosCountInMessagePreparing(message.length)) +
            exports.toOneHundredTwentyEightBitsBinary(message.length)
        : getMessageModThousandTwentyFour(message, '0', exports.toOneHundredTwentyEightBitsBinary(message.length));
};
exports.application = function () {
    //   const stdin = process.openStdin();
    //   stdin.addListener('data', function(d) {
    //     // note:  d is an object, and when converted to a string it will
    //     // end with a linefeed.  so we (rather crudely) account for that
    //     // with toString() and then substring()
    //     console.log('you entered: [' + d.toString().trim() + ']');
    //   });
    //   const dataFromFile = fileSystem.readFileSync(
    //     'C:\\Users\\VALKA\\Desktop\\VVPS_PROJECT\\repositories\\sha-project\\textFile.txt',
    //     'utf8',
    //   );
    //   console.log('text from the file', dataFromFile);
    console.log(exports.padMessage(exports.convertWordToBits('abc')).length);
};
