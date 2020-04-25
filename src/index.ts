// import * as fileSystem from 'fs';
import { compose, take, takeLast, split, map, join } from 'ramda';

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

export const getWords = (blocks: string[]): string[][] => {
  return blocks.map(separateBlockByWords);
};

export const preprocessInput = compose(
  getWords,
  getBlocks,
  padMessage,
  convertInputToBits,
);

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

  console.log(
    preprocessInput(
      'abcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    ),
  );
};
