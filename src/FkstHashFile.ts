import * as fileSystem from 'fs';
import { hash } from './algorithm';

export class FkstHashFile {
  public hash = (filePath: string): string => {
    const data = fileSystem.readFileSync(filePath, 'utf8').trim();
    console.log(data);
    return hash(data);
  };
}
