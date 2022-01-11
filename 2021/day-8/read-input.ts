import * as fs from 'fs';

export const defaultSegments = [
  'abcefg', // 0
  'cf',     // 1 
  'acdeg',  // 2
  'acdfg',  // 3
  'bcdf',   // 4
  'abdfg',  // 5
  'abdefg', // 6
  'acf',    // 7
  'abcdefg',// 8
  'abcdfg', // 9
];

export class Display {
  segments: string[] = [];
  output: string[] = [];
}
export function readInput(fileName = './input.txt'): Display[] {
  const data = fs.readFileSync(fileName).toString();
  
  return data.split('\r\n').map((line) => {
    const parts = line.split(' | ');

    return {
      segments: parts[0].split(' '),
      output: parts[1].split(' ')
    } as Display;
  });
}
