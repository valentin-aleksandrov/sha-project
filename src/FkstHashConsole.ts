import { hash } from './algorithm';

export class FkstHashConsole {
  public hash = (strToHash: string): string => {
    return hash(strToHash);
  };
}
