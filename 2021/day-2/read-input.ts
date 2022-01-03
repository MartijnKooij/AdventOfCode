import * as fs from 'fs';

export function readInput(): {
  operation: string;
  count: number;
}[] {
  const data = fs.readFileSync('./input.txt').toString();

  return data.split('\n').map((l) => {
    const parts = l.split(' ');

    return {
      operation: parts[0],
      count: parseInt(parts[1], 10),
    };
  });
}
