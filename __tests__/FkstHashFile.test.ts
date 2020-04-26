import { FkstHashFile } from '../src/FkstHashFile';

describe('FkstHashFile', () => {
  it('should hash the text from the file', () => {
    const fkstHashFile = new FkstHashFile();
    const input =
      'C:\\Users\\VALKA\\Desktop\\VVPS_PROJECT\\repositories\\sha-project\\textFile.txt';
    const expected =
      'c5493409580caa9130c4a1e291e98c5514d75d92fa24a22cea60540eda964976278fe901313f4fcdba97523da40455c4282e31b8b4b0268e8436be7dcbf1021d';

    expect(fkstHashFile.hash(input)).toBe(expected);
  });
});
