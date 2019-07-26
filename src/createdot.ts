import * as fs from 'fs';
import * as yargs from 'yargs';
import { mystruct, Helper, NONETWORKCONNECTIONS, TOs } from './helper';
import * as cliprogress from 'cli-progress';


const argv = yargs
  .option('i', {
    alias: 'inputfile',
    describe: 'Input JSON File, prior generated with createtmpjson.js',
    type: 'string',
    demand: true,
  })
  .option('o', {
    alias: 'outputfile',
    describe: 'Output DOT File',
    type: 'string',
    demand: true
  }).option('f', {
    alias: 'forceOverwrite',
    describe: 'Force Overwrite existing DOT File',
    type: 'boolean',
    demand: false,
    default: false
  })
  .option('c', {
    alias: 'colors',
    describe: 'Enable Colors and Shapes',
    type: 'boolean',
    demand: 'false',
    default: false
  })
  .argv;

const inputfile = argv.i;
const outputfile = argv.o;
const forceOverwrite = argv.f;
const enableColors = argv.c;
const helperFn = new Helper();
const data: mystruct[] = JSON.parse(fs.readFileSync(inputfile).toString());
const bar = new cliprogress.Bar({}, cliprogress.Presets.shades_classic);


if (!helperFn.fileExists(inputfile)) {
  console.error(`Input-File ${inputfile} does not exist!`);
  process.exit(1);
}

if (helperFn.fileExists(outputfile) && !forceOverwrite) {
  console.error(`Output-File ${outputfile} already exists! If you want to overwrite, consider using the -f option`);
  process.exit(1);
} else if(helperFn.fileExists(outputfile) && forceOverwrite) {
  fs.unlinkSync(outputfile)
}

console.info(`started generating dot-file...`);
console.info(`Inputfile: ${inputfile}`);
console.info(`Outputfile: ${outputfile}`);
console.info(`Have Records: ${data.length}`);
bar.start(data.length, 0);

helperFn.writeOut(outputfile, `digraph Closet{\n`);
for (let i = 0; i < data.length; i++) {
  const currentHost: mystruct = data[i];
  let output = `"${currentHost.hostname}" -> {`
  if (currentHost.routes.length > 0) {
    for (let ii = 0; ii < currentHost.routes.length; ii++) {
      const routeName = currentHost.routes[ii];
      output += `"${routeName}" `;
      if (enableColors) {
        const shape = helperFn.getColorShape(<TOs>currentHost.os);
        if (shape) {
          output += `[style="filled" fillcolor="${shape.color}" fontcolor="${shape.fontcolor ? shape.fontcolor : 'white'}" shape="${shape.shape}"] `;
        }
      }
    }
  } else {
    output += `"${NONETWORKCONNECTIONS}" `;
  }
  output = output.slice(0, output.length - 1);
  output += '};\n';
  helperFn.writeOut(outputfile, output);
  bar.increment(1);
}

bar.stop();
helperFn.writeOut(outputfile, '}\n');
console.info(`successfully wrote dot file ${outputfile}`);
console.info(helperFn.getRunTime());
