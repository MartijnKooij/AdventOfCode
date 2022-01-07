import * as fs from 'fs';

export function readInput(fileName = './input.txt') {
  const data = fs.readFileSync(fileName).toString().replace(/ {2}/g, ' ');
  const lines = data.split('\r\n');

  lines.forEach(line => {
    const values = line.match(/(\d+),(\d+) -> (\d+),(\d+)$)/g);

    console.log('input', values);
  });
}
