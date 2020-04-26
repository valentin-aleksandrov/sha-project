// import * as fileSystem from 'fs';
import { compose, take, takeLast, split, map, join } from 'ramda';
import bigInt from 'big-integer';

const INITIAL_HASH_VALUES = [
  0x6a09e667f3bcc908,
  0xbb67ae8584caa73b,
  0x3c6ef372fe94f82b,
  0xa54ff53a5f1d36f1,
  0x510e527fade682d1,
  0x9b05688c2b3e6c1f,
  0x1f83d9abfb41bd6b,
  0x5be0cd19137e2179,
];

const K = [
  0x428a2f98d728ae22,
  0x7137449123ef65cd,
  0xb5c0fbcfec4d3b2f,
  0xe9b5dba58189dbbc,
  0x3956c25bf348b538,
  0x59f111f1b605d019,
  0x923f82a4af194f9b,
  0xab1c5ed5da6d8118,
  0xd807aa98a3030242,
  0x12835b0145706fbe,
  0x243185be4ee4b28c,
  0x550c7dc3d5ffb4e2,
  0x72be5d74f27b896f,
  0x80deb1fe3b1696b1,
  0x9bdc06a725c71235,
  0xc19bf174cf692694,
  0xe49b69c19ef14ad2,
  0xefbe4786384f25e3,
  0x0fc19dc68b8cd5b5,
  0x240ca1cc77ac9c65,
  0x2de92c6f592b0275,
  0x4a7484aa6ea6e483,
  0x5cb0a9dcbd41fbd4,
  0x76f988da831153b5,
  0x983e5152ee66dfab,
  0xa831c66d2db43210,
  0xb00327c898fb213f,
  0xbf597fc7beef0ee4,
  0xc6e00bf33da88fc2,
  0xd5a79147930aa725,
  0x06ca6351e003826f,
  0x142929670a0e6e70,
  0x27b70a8546d22ffc,
  0x2e1b21385c26c926,
  0x4d2c6dfc5ac42aed,
  0x53380d139d95b3df,
  0x650a73548baf63de,
  0x766a0abb3c77b2a8,
  0x81c2c92e47edaee6,
  0x92722c851482353b,
  0xa2bfe8a14cf10364,
  0xa81a664bbc423001,
  0xc24b8b70d0f89791,
  0xc76c51a30654be30,
  0xd192e819d6ef5218,
  0xd69906245565a910,
  0xf40e35855771202a,
  0x106aa07032bbd1b8,
  0x19a4c116b8d2d0c8,
  0x1e376c085141ab53,
  0x2748774cdf8eeb99,
  0x34b0bcb5e19b48a8,
  0x391c0cb3c5c95a63,
  0x4ed8aa4ae3418acb,
  0x5b9cca4f7763e373,
  0x682e6ff3d6b2b8a3,
  0x748f82ee5defb2fc,
  0x78a5636f43172f60,
  0x84c87814a1f0ab72,
  0x8cc702081a6439ec,
  0x90befffa23631e28,
  0xa4506cebde82bde9,
  0xbef9a3f7b2c67915,
  0xc67178f2e372532b,
  0xca273eceea26619c,
  0xd186b8c721c0c207,
  0xeada7dd6cde0eb1e,
  0xf57d4f7fee6ed178,
  0x06f067aa72176fba,
  0x0a637dc5a2c898a6,
  0x113f9804bef90dae,
  0x1b710b35131c471b,
  0x28db77f523047d84,
  0x32caab7b40c72493,
  0x3c9ebe0a15c9bebc,
  0x431d67c49c100d4c,
  0x4cc5d4becb3e42b6,
  0x597f299cfc657e2a,
  0x5fcb6fab3ad6faec,
  0x6c44198c4a475817,
];

const rotateRight = (x: bigInt.BigInteger, i: number): bigInt.BigInteger => {
  return x.shiftRight(i).or(x.shiftLeft(64 - i));
};

const messageScheduleSigma0 = (x: bigInt.BigInteger): bigInt.BigInteger => {
  return rotateRight(x, 1).xor(rotateRight(x, 8).xor(x.shiftRight(6)));
};
//   rotateRight(x, 1) ^ rotateRight(x, 8) ^ (x >>> 7);

const messageScheduleSigma1 = (x: bigInt.BigInteger): bigInt.BigInteger => {
  return rotateRight(x, 19)
    .xor(rotateRight(x, 61))
    .xor(x.shiftRight(6));
};
//   rotateRight(x, 19) ^ rotateRight(x, 61) ^ (x >>> 6);

const Sigma1 = (x: bigInt.BigInteger): bigInt.BigInteger => {
  return rotateRight(x, 14).xor(rotateRight(x, 18).xor(rotateRight(x, 41)));
};

const Sigma0 = (x: bigInt.BigInteger): bigInt.BigInteger => {
  return rotateRight(x, 28).xor(rotateRight(x, 34).xor(rotateRight(x, 39)));
};

const Ch = (
  x: bigInt.BigInteger,
  y: bigInt.BigInteger,
  z: bigInt.BigInteger,
): bigInt.BigInteger => {
  return x.and(y).xor(x.not().and(z));
};

const Maj = (
  x: bigInt.BigInteger,
  y: bigInt.BigInteger,
  z: bigInt.BigInteger,
): bigInt.BigInteger => {
  return x.and(y).xor(x.and(z).xor(y.and(z)));
};

export const getAsciiValue = (character: string): number => {
  return character.charCodeAt(0);
};

export const toBinary = (number: number): string => number.toString(2);

export const normalizeToEightBits = (binaryValue: string): string => {
  return binaryValue.length === 8
    ? binaryValue
    : normalizeToEightBits('0' + binaryValue);
};

export const normalizeToOneHundredTwentyEightBits = (
  binaryValue: string,
): string => {
  return binaryValue.length === 128
    ? binaryValue
    : normalizeToOneHundredTwentyEightBits('0' + binaryValue);
};

export const characterToBinary = compose(
  normalizeToEightBits,
  toBinary,
  getAsciiValue,
);

export const toOneHundredTwentyEightBitsBinary = compose(
  normalizeToOneHundredTwentyEightBits,
  toBinary,
);

export const convertInputToBits = compose(
  join(''),
  map(characterToBinary),
  split(''),
);

export const zerosCountInMessagePreparing = (messageLength: number): number => {
  return 896 - messageLength - 1;
};

const getMessageModThousandTwentyFour = (
  message: string,
  zeroes: string,
  lastPart: string,
): string => {
  const newMessage = message + '1' + zeroes + lastPart;
  return newMessage.length % 1024 === 0
    ? newMessage
    : getMessageModThousandTwentyFour(message, zeroes + '0', lastPart);
};

export const padMessage = (message: string): string => {
  return message.length < 896
    ? message +
        '1' +
        '0'.repeat(zerosCountInMessagePreparing(message.length)) +
        toOneHundredTwentyEightBitsBinary(message.length)
    : getMessageModThousandTwentyFour(
        message,
        '0',
        toOneHundredTwentyEightBitsBinary(message.length),
      );
};

export const getBlocks = (padMessage: string): string[] => {
  if (padMessage.length === 1024) {
    return [padMessage];
  }
  return [
    take(1024, padMessage),
    ...getBlocks(takeLast(padMessage.length - 1024, padMessage)),
  ];
};

export const separateBlockByWords = (block: string): string[] => {
  if (block.length === 64) {
    return [block];
  }
  return [
    take(64, block),
    ...separateBlockByWords(takeLast(block.length - 64, block)),
  ];
};

export const getWords = (blocks: string[]): number[][] => {
  return blocks
    .map(separateBlockByWords)
    .map(block => block.map(binary => parseInt(binary, 2)));
};

export const preprocessInput = compose(
  getWords,
  getBlocks,
  padMessage,
  convertInputToBits,
);

export const prepareMessageScheduleW = (
  words: number[][],
): bigInt.BigInteger[][] => {
  const W: bigInt.BigInteger[][] = [[]];
  for (let row = 0; row < words.length; row++) {
    for (let col = 0; col < 16; col++) {
      const asBigInt = bigInt(words[row][col]);
      W[row][col] = asBigInt;
    }
    for (let col = 16; col < 80; col++) {
      const computation = messageScheduleSigma1(W[row][col - 2])
        .plus(W[row][col - 7])
        .plus(messageScheduleSigma0(W[row][col - 15]))
        .plus(W[row][col - 16]);

      W[row][col] = computation;
    }
  }
  return W;
};

const dec2hex = (str: string): string => {
  // .toString(16) only works up to 2^53
  const dec = str.toString().split('');
  const sum = [];
  const hex = [];
  let i;
  let s;
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

export const application = (): void => {
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
  const input = 'abc';
  //   const input =
  //     'abcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';

  const blocks = preprocessInput(input);

  const W = prepareMessageScheduleW(preprocessInput(input));

  const buffer = INITIAL_HASH_VALUES.slice().map(num => bigInt(num));

  for (let i = 0; i < blocks.length; i++) {
    let a = buffer[0];
    let b = buffer[1];
    let c = buffer[2];
    let d = buffer[3];
    let e = buffer[4];
    let f = buffer[5];
    let g = buffer[6];
    let h = buffer[7];

    for (let j = 0; j < 80; j++) {
      const t1 = h
        .plus(Sigma1(e))
        .plus(Ch(e, f, g))
        .plus(K[j])
        .plus(W[i][j]);

      const t2 = Sigma0(a).plus(Maj(a, b, c));

      h = g;
      g = f;
      f = e;
      e = d.plus(t1);
      d = c;
      c = b;
      b = a;
      a = t1.plus(t2);
    }

    buffer[0] = a.plus(buffer[0]);
    buffer[1] = b.plus(buffer[1]);
    buffer[2] = c.plus(buffer[2]);
    buffer[3] = d.plus(buffer[3]);
    buffer[4] = e.plus(buffer[4]);
    buffer[5] = f.plus(buffer[5]);
    buffer[6] = g.plus(buffer[6]);
    buffer[7] = h.plus(buffer[7]);
  }

  console.log(
    buffer.map(bigInteger => bigInteger.toString()).map(str => dec2hex(str)),
  );
};
