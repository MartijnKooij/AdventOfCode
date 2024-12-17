import run from 'aocrunner';
import { AocMap } from '../utils/map.js';
import { Point } from '../utils/point.js';

const parseInput = (rawInput: string) => new AocMap(rawInput);

const walk = (map: AocMap, start: Point): void => {
  const dx = [-1, 0, 1, 0];
  const dy = [0, 1, 0, -1];
  const queue: [Point, number][] = [[start, 0]];
  while (queue.length > 0) {
    const [location, step] = queue.shift()!;
    for (let i = 0; i < 4; i++) {
      const nx = location.x + dx[i];
      const ny = location.y + dy[i];
      const next = map.tryGet(nx, ny);
      if (next === '.') {
        map.set(nx, ny, 'O');
        queue.push([{ x: nx, y: ny } as Point, step + 1]);
      }
    }
    map.set(location.x, location.y, '.');
  }
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const start: Point = { x: 0, y: 0 };

  // Find the start
  for (let y = 0; y < input.rows; y++) {
    for (let x = 0; x < input.columns; x++) {
      if (input.get(x, y) === 'S') {
        start.x = x;
        start.y = y;
        input.set(x, y, '.');
        break;
      }
    }
  }

  walk(input, start);
  console.log(input.toString());

  return;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############
`,
        expected: 7036,
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
  onlyTests: true,
});
