import run from 'aocrunner';
import { AocMap } from '../utils/map.js';
import { Point } from '../utils/point.js';

type Direction = 'right' | 'left' | 'down' | 'up';

const directions: Map<Direction, Point> = new Map([
  ['right', { x: 1, y: 0 },],
  ['down', { x: 0, y: 1 },],
  ['left', { x: -1, y: 0 },],
  ['up', { x: 0, y: -1 }]
]);

const parseInput = (rawInput: string) => new AocMap(rawInput);

const dfs = (map: AocMap, position: Point, path: Direction[], visited: Set<string>, paths: Direction[], nextDirection: Direction): void => {
  const { x, y } = position;

  // If out of bounds or hit a wall, return
  if (x < 0 || y < 0 || x >= map.columns || y >= map.rows || map.get(x, y) === '#') return;

  // If this point has been visited, return
  if (visited.has(`${x},${y}`)) return;

  // If reached the end, add the path to paths
  if (map.get(x, y) === 'E') {
    paths.push(nextDirection);
    return;
  }

  // Mark the current point as visited
  visited.add(`${x},${y}`);

  // Explore all directions
  dfs(map, { x: x + 1, y }, [...path, 'right'], visited, paths, 'right');
  dfs(map, { x: x - 1, y }, [...path, 'left'], visited, paths, 'left');
  dfs(map, { x, y: y + 1 }, [...path, 'down'], visited, paths, 'down');
  dfs(map, { x, y: y - 1 }, [...path, 'up'], visited, paths, 'up');

  // Unmark the current point before backtracking
  map.set(x, y, '.');
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const paths: Direction[] = [];
  const visited = new Set<string>();
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

  dfs(input, start, [], visited, paths, 'right');

  console.log(paths);

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
