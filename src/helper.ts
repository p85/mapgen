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

export type TOs = 'BSD'|'BBS'|'IBM'|'MIL'|'Dynix'|'ATT'|'Ultrix'|'VMS'|'SunOS'|'HP-UX'|'Xenix'|'SysV'|'AIX'|'MACH'|'AUX'|'OSES'|'WOPR'|'SECOS'|'RELIC'|'TEL/OS'|'ENCOM';
export interface polygonStruct { os: TOs, color: string, shape: string | null }

// Colornames in Sub Section SVG: https://www.graphviz.org/doc/info/colors.html
export const polygons: polygonStruct[] = [
  {os: 'BSD', color: 'indianred', shape: null},
  {os: 'BBS', color: 'ivory', shape: null},
  {os: 'IBM', color: 'lightskyblue', shape: null},
  {os: 'MIL', color: 'magenta', shape: null},
  {os: 'Dynix', color: 'yellowgreen', shape: null},
  {os: 'ATT', color: 'wheat', shape: null},
  {os: 'Ultrix', color: 'darkturquoise', shape: null},
  {os: 'VMS', color: 'silver', shape: null},
  {os: 'SunOS', color: 'gold', shape: null},
  {os: 'HP-UX', color: 'burlywood', shape: null},
  {os: 'Xenix', color: 'paleturquoise', shape: null},
  {os: 'SysV', color: 'cyan', shape: null},
  {os: 'AIX', color: 'greenyellow', shape: null},
  {os: 'MACH', color: 'moccasin', shape: null},
  {os: 'AUX', color: 'palegreen', shape: null},
  {os: 'OSES', color: 'lightsteelblue', shape: null},
  {os: 'WOPR', color: 'crimson', shape: null},
  {os: 'SECOS', color: 'fuchsia', shape: null},
  {os: 'RELIC', color: 'deeppink', shape: null},
  {os: 'TEL/OS', color: 'lawngreen', shape: null},
  {os: 'ENCOM', color: 'purple', shape: null}
];

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

  public getColorShape(os: TOs): polygonStruct | undefined {
    return polygons.find(poly => poly.os === os);
  }
}