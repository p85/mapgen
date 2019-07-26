import * as fs from 'fs';
import * as yargs from 'yargs';
import * as cliprogress from 'cli-progress';
import {struct, mystruct, Helper, UNKNOWNHOST} from './helper';

const argv = yargs
  .option('i', {
    alias: 'inputfile',
    describe: 'Input JSONL File',
    type: 'string',
    demand: true,
  })
  .option('o', {
    alias: 'outputfile',
    describe: 'Output JSON File',
    type: 'string',
    demand: true
  }).option('f', {
    alias: 'Force overwrite',
    describe: 'Force Overwrite existing JSON File',
    type: 'boolean',
    demand: false,
    default: false
  })
  .option('p', {
    alias: 'pretty',
    describe: 'Pretty Print the JSON, Amount of Spaces to indent',
    type: 'number',
    demand: false,
    default: 0
  })
  .argv;



const inputfile = argv.i;
const outputfile = argv.o;
const forceOverwrite = argv.f;
const prettyPrint = argv.p;
const my: mystruct[] = [];
const bar = new cliprogress.Bar({}, cliprogress.Presets.shades_classic);
const helperFn = new Helper();


if (!helperFn.fileExists(inputfile)) {
  console.error(`Input-File ${inputfile} does not exist!`);
  process.exit(1);
}

if (helperFn.fileExists(outputfile) && !forceOverwrite) {
  console.error(`Output-File ${outputfile} already exists! If you want to overwrite, consider using the -f option`);
  process.exit(1);
}

console.info(`Inputfile: ${inputfile}`);
console.info(`Outputfile: ${outputfile}`);

const jsonlines = fs.readFileSync(inputfile).toString().split('\n');



console.log('Have Records: ' + jsonlines.length);

bar.start(jsonlines.length, 0);

for (let i = 0; i < jsonlines.length; i++) {
  if (!helperFn.isValidJSON(jsonlines[i])) { // discard malformed json
    continue;
  }
  const currentLine: struct = JSON.parse(jsonlines[i]);
  const currentHost = currentLine.h === '' ? `${UNKNOWNHOST.replace(`%%NUM%%`, i.toString())}` : currentLine.h;
  const conns = Object.keys(currentLine.c);

  const haveHost = my.findIndex(m => m.hostname === currentHost);
  if (haveHost === -1) {
    my.push({hostname: currentHost, os: currentLine.os, routes: conns});
  } else {
    conns.forEach(con => {
      const haveRoute = my[haveHost].routes.indexOf(con);
      if (haveRoute === -1) {
        my[haveHost].routes.push(con);
      }
    });
  }
  bar.increment(1);
}

fs.writeFileSync(outputfile, JSON.stringify(my, null, prettyPrint));

bar.stop();
console.info(`successfully wrote json file ${outputfile}`);
const runtime = helperFn.getRunTime();

console.info(`runtime: ${runtime.secs}s ${runtime.ms}ms`);