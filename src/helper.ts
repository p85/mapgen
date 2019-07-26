import * as fs from 'fs';

//JSONL file structure
export interface struct {
  c: { [connTo: string]: number }, // connection to hostname, number of connections?
  h: string; // my hostname
  os: string; // my os
}

// my structure
export interface mystruct {
  hostname: string;
  os: string;
  routes: string[];
}

export const UNKNOWNHOST = `[UNKNOWN_HOST_%%NUM%%]`;

export class Helper {
  protected readonly hrstart = process.hrtime();
  constructor() { }

  public fileExists(filename: string): boolean {
    return fs.existsSync(filename);
  }

  public getRunTime(): {secs: number, ms: number} {
    const hrend = process.hrtime(this.hrstart);
    return {secs: hrend[0], ms: hrend[1] / 1000000};
  }

  public isValidJSON(str: string): boolean {
    try {
      return (JSON.parse(str) && !!str);
    } catch (e) {
      return false;
    }
  }
}