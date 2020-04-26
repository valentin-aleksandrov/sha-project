import { FkstHashString } from '../src/FkstHashString';

describe('FkstHashString', () => {
  it('should hash the input', () => {
    const fkstHashSstring = new FkstHashString();
    const input = 'civic';
    const expected =
      '38679e1931f619f09dcb06eca3bb6908885c73a03756732ddac0782cad9742d4d18cd990cfe47da2d89e1fc53532af9583056d71b2d6dac63c6f5716c5f3063';

    expect(fkstHashSstring.hash(input)).toBe(expected);
  });
});
