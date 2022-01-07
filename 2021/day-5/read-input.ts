import * as fs from 'fs';

export class Line {
  x1 = 0;
  y1 = 0;
  x2 = 0;
  y2 = 0;
}

export function readInput(fileName = './input.txt'): Line[] {
  const data = fs.readFileSync(fileName).toString();
  const lines = data.split('\r\n');

  const points = lines.filter(l => !!l).map(line => {
    const values = [...line.matchAll(/(\d+),(\d+) -> (\d+),(\d+)$/g)];

    // console.log('processing', values);

    return {
      x1: parseInt(values[0][1], 10),
      y1: parseInt(values[0][2], 10),
      x2: parseInt(values[0][3], 10),
      y2: parseInt(values[0][4], 10)
    } as Line;
  });

  // For part 1 only
  // points = points.filter(p => p.x1 === p.x2 || p.y1 === p.y2);

  return points;
}
