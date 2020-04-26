import { hash } from './algorithm';

export class FkstHashString {
  public hash = (strToHash: string): string => {
    return hash(strToHash);
  };
}
