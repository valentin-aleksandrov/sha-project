import * as fileSystem from 'fs';

export const application = (): void => {
  //   const stdin = process.openStdin();
  //   stdin.addListener('data', function(d) {
  //     // note:  d is an object, and when converted to a string it will
  //     // end with a linefeed.  so we (rather crudely) account for that
  //     // with toString() and then substring()
  //     console.log('you entered: [' + d.toString().trim() + ']');
  //   });
  const dataFromFile = fileSystem.readFileSync(
    'C:\\Users\\VALKA\\Desktop\\VVPS_PROJECT\\repositories\\sha-project\\textFile.txt',
    'utf8',
  );
  console.log('text from the file', dataFromFile);
  console.log('Greetings, people!');
};
