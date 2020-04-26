import { hash } from '../src/algorithm';

describe('algorithm', () => {
  it('should hash the input', () => {
    const input = 'honda';
    const expected =
      'c5493409580caa9130c4a1e291e98c5514d75d92fa24a22cea60540eda964976278fe901313f4fcdba97523da40455c4282e31b8b4b0268e8436be7dcbf1021d';

    expect(hash(input)).toBe(expected);
  });
});
