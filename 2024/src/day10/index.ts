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

const countTrails = (input: AocMap, startLocation: Point, visited: Set<string>): number => {
  const currentHeight = Number(input.get(startLocation.x, startLocation.y));
  const currentLocationKey = `${startLocation.x},${startLocation.y}${currentHeight}`;
  if (currentHeight === 9) {
    if (!visited.has(currentLocationKey)) {
      visited.add(currentLocationKey);
      return 1;
    }
    visited.add(currentLocationKey);
    return 0;
  }

  visited.add(currentLocationKey);

  let pathCount = 0;

  for (const direction of directions) {
    const nextLocation = {
      x: startLocation.x + direction.x,
      y: startLocation.y + direction.y,
    };
    if (
      nextLocation.x < 0 ||
      nextLocation.x >= input.columns ||
      nextLocation.y < 0 ||
      nextLocation.y >= input.rows
    ) {
      continue;
    }

    const nextHeight = Number(input.get(nextLocation.x, nextLocation.y));
    if (nextHeight - currentHeight !== 1) {
      continue;
    }

    const nextLocationKey = `${nextLocation.x},${nextLocation.y}${nextHeight}`;
    if (!visited.has(nextLocationKey)) {
      pathCount += countTrails(input, nextLocation, visited);
    }
  }

  return pathCount;
};

const countTrails2 = (input: AocMap, startLocation: Point, visited: Set<string>): number => {
  const currentHeight = Number(input.get(startLocation.x, startLocation.y));
  if (currentHeight === 9) {
    return 1;
  }

  let count = 0;
  visited.add(`${startLocation.x},${startLocation.y}`);

  for (const direction of directions) {
    const nextLocation = {
      x: startLocation.x + direction.x,
      y: startLocation.y + direction.y,
    };
    if (
      nextLocation.x < 0 ||
      nextLocation.x >= input.columns ||
      nextLocation.y < 0 ||
      nextLocation.y >= input.rows
    ) {
      continue;
    }

    const nextHeight = Number(input.get(nextLocation.x, nextLocation.y));
    if (nextHeight - currentHeight !== 1) {
      continue;
    }

    const nextLocationKey = `${nextLocation.x},${nextLocation.y}`;
    if (!visited.has(nextLocationKey)) {
      count += countTrails2(input, nextLocation, new Set(visited));
    }
  }

  return count;
};

const part1 = (rawInput: string) => {
  const input: AocMap = parseInput(rawInput);
  const startLocations: Point[] = [];
  for (let y = 0; y < input.rows; y++) {
    for (let x = 0; x < input.columns; x++) {
      if (input.get(x, y) === "0") {
        startLocations.push({ x, y });
      }
    }
  }

  let sumOfTrails = 0
  for (const startLocation of startLocations) {
    let sumOfTrail = countTrails(input, startLocation, new Set());
    // console.log("sumOfTrail", sumOfTrail);
    sumOfTrails += sumOfTrail;
  }

  return sumOfTrails;
};

const part2 = (rawInput: string) => {
  const input: AocMap = parseInput(rawInput);
  const startLocations: Point[] = [];
  for (let y = 0; y < input.rows; y++) {
    for (let x = 0; x < input.columns; x++) {
      if (input.get(x, y) === "0") {
        startLocations.push({ x, y });
      }
    }
  }

  let sumOfTrails = 0
  for (const startLocation of startLocations) {
    let sumOfTrail = countTrails2(input, startLocation, new Set());
    console.log("sumOfTrail", sumOfTrail);
    sumOfTrails += sumOfTrail;
  }

  return sumOfTrails;
};

run({
  part1: {
    tests: [
      {
        input: `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732
`,
        expected: 36,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732
`,
        expected: 81,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
