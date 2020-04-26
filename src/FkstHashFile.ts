import * as fileSystem from 'fs';
import { hash } from './algorithm';

export class FkstHashFile {
  public hash = (filePath: string): string => {
    return hash(fileSystem.readFileSync(filePath, 'utf8'));
  };
}
