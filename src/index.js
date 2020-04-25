"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
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
exports.convertInputToBits = ramda_1.compose(ramda_1.join(''), ramda_1.map(exports.characterToBinary), ramda_1.split(''));
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
exports.getBlocks = function (padMessage) {
    if (padMessage.length === 1024) {
        return [padMessage];
    }
    return tslib_1.__spreadArrays([
        ramda_1.take(1024, padMessage)
    ], exports.getBlocks(ramda_1.takeLast(padMessage.length - 1024, padMessage)));
};
exports.separateBlockByWords = function (block) {
    if (block.length === 64) {
        return [block];
    }
    return tslib_1.__spreadArrays([
        ramda_1.take(64, block)
    ], exports.separateBlockByWords(ramda_1.takeLast(block.length - 64, block)));
};
exports.getWords = function (blocks) {
    return blocks.map(exports.separateBlockByWords);
};
exports.preprocessInput = ramda_1.compose(exports.getWords, exports.getBlocks, exports.padMessage, exports.convertInputToBits);
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
    console.log(exports.preprocessInput('abcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'));
};
