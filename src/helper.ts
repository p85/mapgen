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
export interface polygonStruct {
  os: TOs,
  color: string,            // Colornames in Sub Section SVG: https://www.graphviz.org/doc/info/colors.html
  shape: string | null,     // Shapes: https://www.graphviz.org/doc/info/shapes.html
  fontcolor?: string,       // Colornames in Sub Section SVG: https://www.graphviz.org/doc/info/colors.html
  img?: string              // relative Path to Image
}

export const polygons: polygonStruct[] = [
  {os: 'BSD', color: 'indianred', shape: 'box'},
  {os: 'BBS', color: 'ivory', shape: 'polygon'},
  {os: 'IBM', color: 'lightskyblue', shape: 'ellipse'},
  {os: 'MIL', color: 'magenta', shape: 'pentagon', fontcolor: 'white'},
  {os: 'Dynix', color: 'yellowgreen', shape: 'oval', img: './node_images/freebsd-seeklogo.com.svg'},
  {os: 'ATT', color: 'wheat', shape: 'circle'},
  {os: 'Ultrix', color: 'darkturquoise', shape: 'egg'},
  {os: 'VMS', color: 'silver', shape: 'triangle'},
  {os: 'SunOS', color: 'gold', shape: 'diamond'},
  {os: 'HP-UX', color: 'burlywood', shape: 'trapezium'},
  {os: 'Xenix', color: 'paleturquoise', shape: 'parallelogram'},
  {os: 'SysV', color: 'cyan', shape: 'house'},
  {os: 'AIX', color: 'greenyellow', shape: 'septagon'},
  {os: 'MACH', color: 'moccasin', shape: 'octagon'},
  {os: 'AUX', color: 'palegreen', shape: 'doubleoctagon'},
  {os: 'OSES', color: 'lightsteelblue', shape: 'invhouse'},
  {os: 'WOPR', color: 'crimson', shape: 'doublecircle', fontcolor: 'white'},
  {os: 'SECOS', color: 'fuchsia', shape: 'hexagon'},
  {os: 'RELIC', color: 'deeppink', shape: 'star', fontcolor: 'black'},
  {os: 'TEL/OS', color: 'lawngreen', shape: 'tripleoctagon'},
  {os: 'ENCOM', color: 'purple', shape: 'Msquare', fontcolor: 'black'}
];

export const UNKNOWNHOST = `[UNKNOWN_HOST_%%NUM%%]`;
export const NONETWORKCONNECTIONS = `[NO_NETWORK_CONNECTIONS]`;
export const UNKNOWN = '?';
export const DEFAULTFONTCOLOR = 'black';

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

  public getNodeOptionsForColors(os: TOs): string {
    const shape = this.getColorShape(os);
    return shape ? `style="filled" fillcolor="${shape.color}" fontcolor="${shape.fontcolor ? shape.fontcolor : DEFAULTFONTCOLOR}" shape="${shape.shape}" ` : ``;
  }
  
  public getNodeOptionsForImage(os: TOs): string {
    const shape = this.getColorShape(os);
    if (shape && shape.img && fs.existsSync(shape.img)) {
      return `image="${shape.img}", width="1" height="1" fixedsize=true fontcolor="${shape.fontcolor ? shape.fontcolor : DEFAULTFONTCOLOR}" `;
    } else if (shape && shape.img && !fs.existsSync(shape.img)) {
      console.error(`Image File ${shape.img} not found for OS: ${os}!`);
      process.exit(1);
    }
    return '';
  }

  public getLabelForNodeOptions(hostname: string, os: TOs, connections: string): string {
    return `label="${hostname}\\n${os}\\nConnections: ${connections}"`;
  }
}