import * as fs from 'fs';

export function readInput() {
  const data = fs.readFileSync('./input.txt').toString();

  return data.split('\r\n');
}
