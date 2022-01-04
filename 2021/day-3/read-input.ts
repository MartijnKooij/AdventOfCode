import * as fs from 'fs';

export function readInput(fileName = './input.txt') {
  const data = fs.readFileSync(fileName).toString();

  return data.split('\r\n');
}
