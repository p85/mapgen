import * as fs from 'fs';

interface mystruct {
  hostname: string;
  os: string;
  routes: string[];
}

const data: mystruct[] = JSON.parse(fs.readFileSync('out.json').toString());
const outfile: string = 'out.dot';

if (fs.existsSync(outfile)) fs.unlinkSync(outfile);

function writeOut(data: string): void {
  fs.appendFileSync(outfile, data);
}

console.log(data.length);

writeOut('digraph Closet{\n');
for (let i = 0; i < data.length; i++) {
  const currentHost: mystruct = data[i];
  let output = `"${currentHost.hostname}" -> {`
  if (currentHost.routes.length > 0) {
    for (let ii = 0; ii < currentHost.routes.length; ii++) {
      const routeName = currentHost.routes[ii];
      output += `"${routeName}" `;
    }
  } else {
    output += `"[NO_NETWORK_CONNECTIONS]" `;
  }
  output = output.slice(0, output.length - 1);
  output += '};\n';
  writeOut(output);
}

writeOut('}\n');
console.log('done');

// data.forEach((item: mystruct, index: number) => {
//   const currentHost: mystruct = item;
//   let output = `"${currentHost.hostname}" -> {`
//   if (currentHost.routes.length > 0) {
//     for (let ii = 0; ii < currentHost.routes.length; i++) {
//       const routeName = currentHost.routes[ii];
//       output += routeName + ' ';
//     }
//   } else {
//     output += `[UNKNOWN_${index}] `;
//   }
//   output += '}\n';
//   console.log(i);
// });