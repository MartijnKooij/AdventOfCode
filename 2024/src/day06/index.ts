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

  let counter = 0;
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
    // console.log(map.values.map(row => row.join('')).join('\n'));
    // console.log('\n');
    counter++;
    if (counter > 10000) {
      break;
    }
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
  const input = parseInput(rawInput);
  const guard = { x: 4, y: 6 } as Point;

  return;
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
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
