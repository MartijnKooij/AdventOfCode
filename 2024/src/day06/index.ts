import run from 'aocrunner';
import { AocMap } from '../utils/map.js';

type Direction = '>' | '<' | 'v' | '^';
type Point = { x: number, y: number };

const directions: Map<Direction, Point> = new Map([
  ['>', { x: 1, y: 0 },],
  ['v', { x: 0, y: 1 },],
  ['<', { x: -1, y: 0 },],
  ['^', { x: 0, y: -1 }]
]);

const parseInput = (rawInput: string) => new AocMap(rawInput);

const part1 = (rawInput: string) => {
  const map = parseInput(rawInput);
  const guard = { x: 0, y: 0 } as Point;
  let direction = '^' as Direction;
  for (let y = 0; y < map.rows; y++) {
    for (let x = 0; x < map.columns; x++) {
      if (directions.has(map.values[y][x] as Direction)) {
        guard.x = x;
        guard.y = y;
        direction = map.values[y][x] as Direction;
        break;
      }
    }
  }
  map.values[guard.y][guard.x] = 'X';

  while (true) {
    const next = { x: guard.x + directions.get(direction)!.x, y: guard.y + directions.get(direction)!.y };
    if (next.x < 0 || next.x >= map.columns || next.y < 0 || next.y >= map.rows) {
      break;
    }
    if (map.values[next.y][next.x] === '#') {
      direction = direction === '^' ? '>' : direction === '>' ? 'v' : direction === 'v' ? '<' : '^';
    } else {
      guard.x = next.x;
      guard.y = next.y;
    }
    map.values[guard.y][guard.x] = 'X';
  }

  let sum = 0;
  map.values.forEach(row => {
    row.forEach(cell => {
      if (cell === 'X') {
        sum++;
      }
    });
  });

  return sum;
};

const part2 = (rawInput: string) => {
  const map = parseInput(rawInput);
  const guard = { x: 0, y: 0 } as Point;
  let direction = '^' as Direction;
  for (let y = 0; y < map.rows; y++) {
    for (let x = 0; x < map.columns; x++) {
      if (directions.has(map.values[y][x] as Direction)) {
        guard.x = x;
        guard.y = y;
        direction = map.values[y][x] as Direction;
        break;
      }
    }
  }
  const originalGuard = { x: guard.x, y: guard.y };
  const originalDirection = direction;

  // Create a list of all the currently open cells indicated by a dot.
  const openCells: Point[] = [];
  map.values.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell === '.') {
        openCells.push({ x, y });
      }
    });
  });

  let blocked = 0;
  openCells.forEach(cell => {
    // Reset
    const workingMap = new AocMap(map.toString());
    guard.x = originalGuard.x;
    guard.y = originalGuard.y;
    direction = originalDirection;

    workingMap.values[cell.y][cell.x] = '#';
    workingMap.values[guard.y][guard.x] = 'X';
    const visited = new Set<string>();
    visited.add(`${guard.x},${guard.y},${direction}`);

    while (true) {
      const next = { x: guard.x + directions.get(direction)!.x, y: guard.y + directions.get(direction)!.y };
      if (next.x < 0 || next.x >= workingMap.columns || next.y < 0 || next.y >= workingMap.rows) {
        break;
      }
      if (workingMap.values[next.y][next.x] === '#') {
        direction = direction === '^' ? '>' : direction === '>' ? 'v' : direction === 'v' ? '<' : '^';
      } else {
        guard.x = next.x;
        guard.y = next.y;
      }
      const key = `${guard.x},${guard.y},${direction}`;
      if (visited.has(key)) {
        console.log('Loop detected', key);
        blocked++;
        break;
      }
      visited.add(key);
      workingMap.values[guard.y][guard.x] = 'X';
    }
  });

  return blocked;
};

run({
  part1: {
    tests: [
      {
        input: `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...
`,
        expected: 41,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...
`,
        expected: 6,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
