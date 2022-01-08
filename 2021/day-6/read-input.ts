import * as fs from 'fs';

export function readInput(fileName = './input.txt'): Array<number> {
  const data = fs.readFileSync(fileName).toString();
  
  return data.split(',').filter(v => !!v).map(v => parseInt(v, 10));
}
