import run from 'aocrunner';
import { AocMap } from '../utils/map.js';

type Point = { x: number; y: number };
const parseInput = (rawInput: string) => new AocMap(rawInput);
const directions = [
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
  { x: 0, y: -1 },
];
type Plot = { type: string, size: number, perimeter: number };

const getPlots = (map: AocMap, startLocation: Point, visited: Set<string>, plot: Plot): void => {
  const currentArea = map.get(startLocation.x, startLocation.y);
  const currentLocationKey = `${startLocation.x},${startLocation.y},${currentArea}`;

  visited.add(currentLocationKey);

  for (const direction of directions) {
    const nextLocation = {
      x: startLocation.x + direction.x,
      y: startLocation.y + direction.y,
    };
    if (
      nextLocation.x < 0 ||
      nextLocation.x >= map.columns ||
      nextLocation.y < 0 ||
      nextLocation.y >= map.rows
    ) {
      plot.perimeter++;
      continue;
    }

    const nextArea = map.get(nextLocation.x, nextLocation.y);
    if (nextArea !== currentArea) {
      plot.perimeter++;
    }

    if (nextArea === currentArea) {
      const nextLocationKey = `${nextLocation.x},${nextLocation.y},${nextArea}`;
      if (!visited.has(nextLocationKey)) {
        visited.add(nextLocationKey);
        plot.size++;
        getPlots(map, nextLocation, visited, plot);
      }
    }
  }
};

const part1 = (rawInput: string) => {
  const map = parseInput(rawInput);
  const plots = [];

  for (let y = 0; y < map.rows; y++) {
    for (let x = 0; x < map.columns; x++) {
      if (map.get(x, y) !== '.') {
        const visited = new Set<string>();
        const plot = { size: 1, perimeter: 0, type: map.get(x, y) } as Plot;
        getPlots(map, { x, y }, visited, plot);
        plots.push(plot);

        for (const key of visited) {
          const [x, y] = key.split(',');
          map.set(+x, +y, '.');
        }
      }
    }
  }

  let sum = 0;
  for (const plot of plots.values()) {
    sum += plot.size * plot.perimeter;
  }
  return sum;
};

const part2 = (rawInput: string) => {
  const map = parseInput(rawInput);
  const plots = [];

  for (let y = 0; y < map.rows; y++) {
    for (let x = 0; x < map.columns; x++) {
      if (map.get(x, y) !== '.') {
        const visited = new Set<string>();
        const plot = { size: 1, perimeter: 0, type: map.get(x, y) } as Plot;
        getPlots(map, { x, y }, visited, plot);
        plots.push(plot);

        for (const key of visited) {
          const [x, y] = key.split(',');
          map.set(+x, +y, '.');
        }
      }
    }
  }

  console.log(plots);

  let sum = 0;
  for (const plot of plots.values()) {
    sum += plot.size * plot.perimeter;
  }
  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE
`,
        expected: 1930,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `AAAA
BBCD
BBCC
EEEC
`,
        expected: 80,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
