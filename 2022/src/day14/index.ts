import run from 'aocrunner';
import * as fs from 'fs';

const drawMap = (input: { x: number; y: number; }[][]): { map: string[][], maxY: number } => {
  const map: string[][] = [];
  for (let y = 0; y < 1000; y++) {
    map.push(''.padEnd(1000, '.').split(''));
  }
  let maxY = 0;

  for (const line of input) {
    for (let p = 0; p < line.length - 1; p++) {
      const p1 = line[p];
      const p2 = line[p + 1];
      const xDiff = Math.abs(p1.x - p2.x);
      const xStart = Math.min(p1.x, p2.x);
      const yDiff = Math.abs(p1.y - p2.y);
      const yStart = Math.min(p1.y, p2.y);

      if (xDiff > 0) {
        for (let x = xStart; x <= xStart + xDiff; x++) {
          map[yStart][x] = '#';
        }

      }
      if (yDiff > 0) {
        for (let y = yStart; y <= yStart + yDiff; y++) {
          map[y][xStart] = '#';
          if (y > maxY) maxY = y;
        }
      }
    }
  }
  return { map, maxY };
}

const parseInput = (rawInput: string) => rawInput
  .split('\n').map(l => l
    .split(' -> ').map((p) => {
      const point = p.split(',');
      return {
        x: parseInt(point[0], 10),
        y: parseInt(point[1], 10)
      };
    }));

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const { map, maxY } = drawMap(input);
  let currentLocation = { x: 500, y: 0 };
  const sand = [];

  while (true) {
    if (currentLocation.y > maxY) {
      break;
    }

    if (map[currentLocation.y + 1][currentLocation.x] === '.') {
      currentLocation = {x: currentLocation.x, y: currentLocation.y + 1};
      continue;
    }

    if (map[currentLocation.y + 1][currentLocation.x - 1] === '.') {
      currentLocation = {x: currentLocation.x - 1, y: currentLocation.y + 1};
      continue;
    }

    if (map[currentLocation.y + 1][currentLocation.x + 1] === '.') {
      currentLocation = {x: currentLocation.x + 1, y: currentLocation.y + 1};
      continue;
    }

    // Settled.
    map[currentLocation.y][currentLocation.x] = 'o';
    sand.push(currentLocation);
    currentLocation = { x: 500, y: 0 };
  }

  fs.writeFileSync('./map.txt', map.map(row => row.join('')).join('\n'));

  return sand.length;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let { map, maxY } = drawMap(input);
  maxY += 2;
  for (let x = 0; x < 1000; x++) {
    map[maxY][x] = '#';
  }
  let currentLocation = { x: 500, y: 0 };
  const sand = [];

  while (true) {
    if (map[currentLocation.y + 1][currentLocation.x] === '.') {
      currentLocation = {x: currentLocation.x, y: currentLocation.y + 1};
      continue;
    }

    if (map[currentLocation.y + 1][currentLocation.x - 1] === '.') {
      currentLocation = {x: currentLocation.x - 1, y: currentLocation.y + 1};
      continue;
    }

    if (map[currentLocation.y + 1][currentLocation.x + 1] === '.') {
      currentLocation = {x: currentLocation.x + 1, y: currentLocation.y + 1};
      continue;
    }

    // Settled.
    map[currentLocation.y][currentLocation.x] = 'o';
    sand.push(currentLocation);

    if (currentLocation.y === 0) {
      break;
    }
    currentLocation = { x: 500, y: 0 };
  }

  fs.writeFileSync('./map.txt', map.map(row => row.join('')).join('\n'));

  return sand.length;
};

run({
  part1: {
    tests: [
      // {
      //   input: `
      //   498,4 -> 498,6 -> 496,6
      //   503,4 -> 502,4 -> 502,9 -> 494,9`,
      //   expected: 24,
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: `
      //   498,4 -> 498,6 -> 496,6
      //   503,4 -> 502,4 -> 502,9 -> 494,9`,
      //   expected: 93,
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

