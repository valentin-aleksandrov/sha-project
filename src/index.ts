import { FkstHashString } from './FKSTHashString';
// import { FkstHashConsole } from './FkstHashConsole';
// import { FkstHashFile } from './FkstHashFile';

export const application = (): void => {
  const input = 'honda';
  const fkstHashString = new FkstHashString();
  console.log(fkstHashString.hash(input));

  //   const fkstHashConsole = new FkstHashConsole();
  //   const stdin = process.openStdin();
  //   console.log('Please enter your input:');
  //   stdin.addListener('data', input => {
  //     console.log(fkstHashConsole.hash(input.toString().trim()));
  //   });

  //   const filePath =
  //     'C:\\Users\\VALKA\\Desktop\\VVPS_PROJECT\\repositories\\sha-project\\textFile.txt';
  //   const fkstHashFile = new FkstHashFile();
  //   console.log(fkstHashFile.hash(filePath));
};
