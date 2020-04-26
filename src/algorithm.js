"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var ramda_1 = require("ramda");
// eslint-disable-next-line @typescript-eslint/no-var-requires
var big_integer_1 = tslib_1.__importDefault(require("big-integer"));
var INITIAL_HASH_VALUES = [
    '6a09e667f3bcc908',
    'bb67ae8584caa73b',
    '3c6ef372fe94f82b',
    'a54ff53a5f1d36f1',
    '510e527fade682d1',
    '9b05688c2b3e6c1f',
    '1f83d9abfb41bd6b',
    '5be0cd19137e2179',
];
var K = [
    '428a2f98d728ae22',
    '7137449123ef65cd',
    'b5c0fbcfec4d3b2f',
    'e9b5dba58189dbbc',
    '3956c25bf348b538',
    '59f111f1b605d019',
    '923f82a4af194f9b',
    'ab1c5ed5da6d8118',
    'd807aa98a3030242',
    '12835b0145706fbe',
    '243185be4ee4b28c',
    '550c7dc3d5ffb4e2',
    '72be5d74f27b896f',
    '80deb1fe3b1696b1',
    '9bdc06a725c71235',
    'c19bf174cf692694',
    'e49b69c19ef14ad2',
    'efbe4786384f25e3',
    '0fc19dc68b8cd5b5',
    '240ca1cc77ac9c65',
    '2de92c6f592b0275',
    '4a7484aa6ea6e483',
    '5cb0a9dcbd41fbd4',
    '76f988da831153b5',
    '983e5152ee66dfab',
    'a831c66d2db43210',
    'b00327c898fb213f',
    'bf597fc7beef0ee4',
    'c6e00bf33da88fc2',
    'd5a79147930aa725',
    '06ca6351e003826f',
    '142929670a0e6e70',
    '27b70a8546d22ffc',
    '2e1b21385c26c926',
    '4d2c6dfc5ac42aed',
    '53380d139d95b3df',
    '650a73548baf63de',
    '766a0abb3c77b2a8',
    '81c2c92e47edaee6',
    '92722c851482353b',
    'a2bfe8a14cf10364',
    'a81a664bbc423001',
    'c24b8b70d0f89791',
    'c76c51a30654be30',
    'd192e819d6ef5218',
    'd69906245565a910',
    'f40e35855771202a',
    '106aa07032bbd1b8',
    '19a4c116b8d2d0c8',
    '1e376c085141ab53',
    '2748774cdf8eeb99',
    '34b0bcb5e19b48a8',
    '391c0cb3c5c95a63',
    '4ed8aa4ae3418acb',
    '5b9cca4f7763e373',
    '682e6ff3d6b2b8a3',
    '748f82ee5defb2fc',
    '78a5636f43172f60',
    '84c87814a1f0ab72',
    '8cc702081a6439ec',
    '90befffa23631e28',
    'a4506cebde82bde9',
    'bef9a3f7b2c67915',
    'c67178f2e372532b',
    'ca273eceea26619c',
    'd186b8c721c0c207',
    'eada7dd6cde0eb1e',
    'f57d4f7fee6ed178',
    '06f067aa72176fba',
    '0a637dc5a2c898a6',
    '113f9804bef90dae',
    '1b710b35131c471b',
    '28db77f523047d84',
    '32caab7b40c72493',
    '3c9ebe0a15c9bebc',
    '431d67c49c100d4c',
    '4cc5d4becb3e42b6',
    '597f299cfc657e2a',
    '5fcb6fab3ad6faec',
    '6c44198c4a475817',
].map(function (hex) { return big_integer_1["default"](hex, 16); });
var rotateRight = function (x, i) {
    return x
        .shiftRight(i)
        .or(x.shiftLeft(64 - i))
        .and(big_integer_1["default"]('ffffffffffffffff', 16));
};
var messageScheduleSigma0 = function (x) {
    return rotateRight(x, 1).xor(rotateRight(x, 8).xor(x.shiftRight(7)));
};
var messageScheduleSigma1 = function (x) {
    return rotateRight(x, 19)
        .xor(rotateRight(x, 61))
        .xor(x.shiftRight(6));
};
var Sigma1 = function (x) {
    return rotateRight(x, 14).xor(rotateRight(x, 18).xor(rotateRight(x, 41)));
};
var Sigma0 = function (x) {
    return rotateRight(x, 28).xor(rotateRight(x, 34).xor(rotateRight(x, 39)));
};
var Ch = function (x, y, z) {
    return x.and(y).xor(x.not().and(z));
};
var Maj = function (x, y, z) {
    return x.and(y).xor(x.and(z).xor(y.and(z)));
};
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
    return blocks
        .map(exports.separateBlockByWords)
        .map(function (block) { return block.map(function (binary) { return big_integer_1["default"](binary, 2); }); });
};
exports.preprocessInput = ramda_1.compose(exports.getWords, exports.getBlocks, exports.padMessage, exports.convertInputToBits);
var dec2hex = function (str) {
    var dec = str.toString().split('');
    var sum = [];
    var hex = [];
    var i;
    var s;
    while (dec.length) {
        s = Number(dec.shift()) * 1;
        for (i = 0; s || i < sum.length; i++) {
            s += (sum[i] || 0) * 10;
            sum[i] = s % 16;
            s = (s - sum[i]) / 16;
        }
    }
    while (sum.length) {
        hex.push(sum.pop().toString(16));
    }
    return hex.join('');
};
exports.hash = function (input) {
    var blocks = exports.preprocessInput(input);
    var buffer = INITIAL_HASH_VALUES.map(function (num) { return big_integer_1["default"](num, 16); });
    var W = [];
    for (var i = 0; i < blocks.length; i++) {
        for (var j = 0; j < 16; j++) {
            var asBigInt = blocks[i][j];
            W[j] = asBigInt;
        }
        for (var j = 16; j < 80; j++) {
            var computation = messageScheduleSigma1(W[j - 2])
                .plus(W[j - 7])
                .plus(messageScheduleSigma0(W[j - 15]))
                .plus(W[j - 16]);
            W[j] = computation.and(big_integer_1["default"]('ffffffffffffffff', 16)); // 2^64
        }
        var a = buffer[0], b = buffer[1], c = buffer[2], d = buffer[3], e = buffer[4], f = buffer[5], g = buffer[6], h = buffer[7];
        for (var j = 0; j < 80; j++) {
            var t1 = h
                .plus(Sigma1(e))
                .plus(Ch(e, f, g))
                .plus(K[j])
                .plus(W[j])
                .and(big_integer_1["default"]('ffffffffffffffff', 16));
            var t2 = Sigma0(a)
                .plus(Maj(a, b, c))
                .and(big_integer_1["default"]('ffffffffffffffff', 16));
            h = g;
            g = f;
            f = e;
            e = d.plus(t1).and(big_integer_1["default"]('ffffffffffffffff', 16));
            d = c;
            c = b;
            b = a;
            a = t1.plus(t2).and(big_integer_1["default"]('ffffffffffffffff', 16));
        }
        buffer[0] = a.plus(buffer[0]).and(big_integer_1["default"]('ffffffffffffffff', 16));
        buffer[1] = b.plus(buffer[1]).and(big_integer_1["default"]('ffffffffffffffff', 16));
        buffer[2] = c.plus(buffer[2]).and(big_integer_1["default"]('ffffffffffffffff', 16));
        buffer[3] = d.plus(buffer[3]).and(big_integer_1["default"]('ffffffffffffffff', 16));
        buffer[4] = e.plus(buffer[4]).and(big_integer_1["default"]('ffffffffffffffff', 16));
        buffer[5] = f.plus(buffer[5]).and(big_integer_1["default"]('ffffffffffffffff', 16));
        buffer[6] = g.plus(buffer[6]).and(big_integer_1["default"]('ffffffffffffffff', 16));
        buffer[7] = h.plus(buffer[7]).and(big_integer_1["default"]('ffffffffffffffff', 16));
    }
    return buffer
        .map(function (bigInteger) { return bigInteger.toString(); })
        .map(function (str) { return dec2hex(str); })
        .join('');
};
