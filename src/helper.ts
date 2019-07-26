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
export const NONETWORKCONNECTIONS = `[NO_NETWORK_CONNECTIONS]`;

export class Helper {
  protected readonly hrstart = process.hrtime();
  constructor() { }

  public fileExists(filename: string): boolean {
    return fs.existsSync(filename);
  }

  public getRunTime(): string {
    const hrend = process.hrtime(this.hrstart);
    return `runtime: ${hrend[0]}s ${hrend[1] / 1000000}ms`;
  }

  public isValidJSON(str: string): boolean {
    try {
      return (JSON.parse(str) && !!str);
    } catch (e) {
      return false;
    }
  }

  public writeOut(filename: string, data: string): void {
    fs.appendFileSync(filename, data);
  }
}