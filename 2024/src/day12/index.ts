import run from 'aocrunner';
import { AocMap } from '../utils/map.js';
import { dir } from 'console';

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

const getPlots2 = (map: AocMap, startLocation: Point, visited: Set<string>, plot: Plot): void => {
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
        getPlots2(map, nextLocation, visited, plot);
      }
    }
  }
};

const calculatePerimeter = (visited: Set<string>, map: AocMap) => {
  let corners = 0;
  for (const key of visited) {
    const [x, y] = key.split(',').map(Number);
    const area = key.split(',')[2];

    const top = { x: x - 1, y };
    const right = { x, y: y + 1 };
    const bottom = { x: x + 1, y };
    const left = { x, y: y - 1 };
    const topLeft = { x: x - 1, y: y - 1 };
    const topRight = { x: x - 1, y: y + 1 };
    const bottomLeft = { x: x + 1, y: y - 1 };
    const bottomRight = { x: x + 1, y: y + 1 };

    // Check all convex corners
    if (
      (top.x < 0 || top.x > map.columns - 1 || top.y < 0 || top.y > map.rows - 1 || map.get(top.x, top.y) !== area) &&
      (right.x < 0 || right.x > map.columns - 1 || right.y < 0 || right.y > map.rows - 1 || map.get(right.x, right.y) !== area) &&
      (topRight.x < 0 || topRight.x > map.columns - 1 || topRight.y < 0 || topRight.y > map.rows - 1 || map.get(topRight.x, topRight.y) === area)
    ) {
      corners++;
    }

    // Check all concave corners
    if (
      (top.x < 0 || top.x > map.columns - 1 || top.y < 0 || top.y > map.rows - 1 || map.get(top.x, top.y) === area) &&
      (right.x < 0 || right.x > map.columns - 1 || right.y < 0 || right.y > map.rows - 1 || map.get(right.x, right.y) === area) &&
      (topRight.x < 0 || topRight.x > map.columns - 1 || topRight.y < 0 || topRight.y > map.rows - 1 || map.get(topRight.x, topRight.y) !== area)
    ) {
      corners++;
    }

    // Check all diagonal corners
    if (
      (top.x < 0 || top.x > map.columns - 1 || top.y < 0 || top.y > map.rows - 1 || map.get(top.x, top.y) !== area) &&
      (right.x < 0 || right.x > map.columns - 1 || right.y < 0 || right.y > map.rows - 1 || map.get(right.x, right.y) !== area) &&
      (topRight.x < 0 || topRight.x > map.columns - 1 || topRight.y < 0 || topRight.y > map.rows - 1 || map.get(topRight.x, topRight.y) !== area)
    ) {
      corners++;
    }
  }
  return corners;
};

const part2 = (rawInput: string) => {
  const map = parseInput(rawInput);
  const plots = [];

  for (let y = 0; y < map.rows; y++) {
    for (let x = 0; x < map.columns; x++) {
      if (map.get(x, y) !== '.') {
        const visited = new Set<string>();
        const plot = { size: 1, perimeter: 0, type: map.get(x, y) } as Plot;
        getPlots2(map, { x, y }, visited, plot);
        plot.perimeter = calculatePerimeter(visited, map);
        plots.push({ plot, visited });

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
    sum += plot.plot.size * plot.plot.perimeter;
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
