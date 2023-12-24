import run from 'aocrunner';
import * as fs from 'fs';

type Point = { x: number, y: number };
type Direction = 'right' | 'left' | 'down' | 'up';

const directions: Map<Direction, Point> = new Map([
  ['right', { x: 1, y: 0 },],
  ['down', { x: 0, y: 1 },],
  ['left', { x: -1, y: 0 },],
  ['up', { x: 0, y: -1 }]
]);

const parseInput = (rawInput: string) => rawInput.split('\n').filter(l => !!l).map(l => l.split(''));

const part1 = (rawInput: string) => {
  const map = parseInput(rawInput);
  const width = map[0].length;
  const height = map.length;
  let start: Point = { x: 0, y: 0 };
  let end: Point = { x: 0, y: 0 };
  const paths: Direction[][] = [];
  const visited = new Set<string>();

  // Find start and end points
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (map[y][x] === 'S') start = { x, y };
      if (map[y][x] === 'E') end = { x, y };
    }
  }

  function canPass(point: Point, direction: Direction, nextDirection: Direction): boolean {
    const { x, y } = point;
    const cell = map[y][x];
    const nextY = y + directions.get(nextDirection)!.y;
    const nextX = x + directions.get(nextDirection)!.x;
    if (cell === '#') return false;
    if (cell === '.') return true;
    if (nextX >= 0 && nextY >= 0 && nextX < width && nextY < height) {
      const nextCell = map[nextY][nextX];
      if (cell === '>' && direction === 'left' && cell === nextCell) return false;
      if (cell === '<' && direction === 'right' && cell === nextCell) return false;
      if (cell === '^' && direction === 'down' && cell === nextCell) return false;
      if (cell === 'v' && direction === 'up' && cell === nextCell) return false;
    }

    return true;
  }

  function dfs(position: Point, path: Direction[], direction: Direction, nextDirection: Direction): void {
    const { x, y } = position;

    // If out of bounds or hit a wall, return
    if (x < 0 || y < 0 || x >= width || y >= height || !canPass(position, direction, nextDirection)) return;

    // If this point has been visited, return
    if (visited.has(`${x},${y}`)) return;

    // If reached the end, add the path to paths
    if (position.x === end.x && position.y === end.y) {
      paths.push(path);
      return;
    }

    // Mark the current point as visited
    visited.add(`${x},${y}`);

    // Explore all directions
    dfs({ x: x + 1, y }, [...path, 'right'], 'right', 'right');
    dfs({ x: x - 1, y }, [...path, 'left'], 'left', 'left');
    dfs({ x, y: y + 1 }, [...path, 'down'], 'down', 'down');
    dfs({ x, y: y - 1 }, [...path, 'up'], 'up', 'up');

    // Unmark the current point before backtracking
    map[y][x] = '.';
  }

  dfs(start, [], 'down', 'down');

  const longestPath = paths.sort((a, b) => a.length < b.length ? 1 : -1)[0];
  console.table(longestPath);

  let { x, y } = start;
  longestPath.forEach((direction: Direction) => {
    x += directions.get(direction)!.x;
    y += directions.get(direction)!.y;
    map[y][x] = direction.toString().substring(0, 1).toUpperCase();
  });
  fs.writeFileSync('./map.txt', map.map(r => r.join('')).join('\n'));

  console.log('lengths', longestPath.length, [...new Set(longestPath)].length);w
  return longestPath?.length;
};

const part2 = (rawInput: string) => {
  const map = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `
        #S#####################
        #.......#########...###
        #######.#########.#.###
        ###.....#.>.>.###.#.###
        ###v#####.#v#.###.#.###
        ###.>...#.#.#.....#...#
        ###v###.#.#.#########.#
        ###...#.#.#.......#...#
        #####.#.#.#######.#.###
        #.....#.#.#.......#...#
        #.#####.#.#.#########v#
        #.#...#...#...###...>.#
        #.#.#v#######v###.###v#
        #...#.>.#...>.>.#.###.#
        #####v#.#.###v#.#.###.#
        #.....#...#...#.#.#...#
        #.#########.###.#.#.###
        #...###...#...#...#.###
        ###.###.#.###v#####v###
        #...#...#.#.>.>.#.>.###
        #.###.###.#.###.#.#v###
        #.....###...###...#...#
        #####################E#
        `,
        expected: 94,
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
