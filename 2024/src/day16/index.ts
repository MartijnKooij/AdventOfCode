import run from 'aocrunner';
import { AocMap } from '../utils/map.js';
import { Point } from '../utils/point.js';
import TinyQueue from 'tinyqueue';

const parseInput = (rawInput: string) => new AocMap(rawInput);

const walk = (map: AocMap, start: Point): number => {
  const dx = [-1, 0, 1, 0];
  const dy = [0, 1, 0, -1];
  const directions = ['<', 'v', '>', '^'];
  const turnPenalty = 1000;
  const queue = new TinyQueue([{ point: start, direction: '', turns: 0, score: 0, length: 0 }], (a, b) => a.score - b.score);
  const visited = new Set<string>();
  const predecessor = new Map<string, { point: Point, direction: string }>();
  let finalTurns = 0;
  let finalScore = 0;

  while (queue.length > 0) {
    const { point: location, direction: currentDirection, score, turns, length } = queue.pop()!;
    for (let i = 0; i < 4; i++) {
      const nx = location.x + dx[i];
      const ny = location.y + dy[i];
      const next = map.tryGet(nx, ny);
      const newDirection = directions[i];
      const isTurn = currentDirection !== null && currentDirection !== newDirection;
      const newStep = score + 1 + (isTurn ? turnPenalty : 0);

      if (next === '.' && !visited.has(`${nx},${ny}`)) {
        visited.add(`${nx},${ny}`);
        predecessor.set(`${nx},${ny}`, { point: location, direction: newDirection });
        queue.push({ point: { x: nx, y: ny } as Point, direction: newDirection, turns: turns + (isTurn ? 1 : 0), score: newStep, length: length + 1 });
      }
      if (next === 'E') {
        console.log('Found exit at', nx, ny, 'in', newStep, 'score', score, 'length', length + 1, 'turns', turns);
        finalTurns = turns;
        finalScore = length;
        let current = { x: location.x, y: location.y } as Point;
        while (current && !(current.x === start.x && current.y === start.y)) {
          const prev = predecessor.get(`${current.x},${current.y}`);
          if (prev) {
            map.set(current.x, current.y, prev.direction);
            current = prev.point;
          } else {
            break;
          }
        }
        queue.length = 0;
        break;
      }
    }
  }
  // There's an off by one error in the turns, I think when we start width a turn... Manually submitted the answer.
  console.log('Final score', finalScore, 'Final turns', finalTurns, 'Penalty', turnPenalty);
  return finalScore + 1 + (finalTurns - 1) * turnPenalty;
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

  const score = walk(input, start);
  // console.log(input.toString());

  return score;
};

const walk2 = (map: AocMap, start: Point): { score: number, paths: Array<Array<Point>> } => {
  const dx = [-1, 0, 1, 0];
  const dy = [0, 1, 0, -1];
  const directions = ['<', 'v', '>', '^'];
  const turnPenalty = 1000;
  const queue = new TinyQueue([{ point: start, direction: '', turns: 0, score: 0, length: 0, path: [start] }], (a, b) => a.score - b.score);
  const visited = new Set<string>();
  const predecessor = new Map<string, { point: Point, direction: string }>();
  const paths: Point[][] = [];

  while (queue.length > 0) {
    const { point: location, direction: currentDirection, score, turns, length, path } = queue.pop()!;
    for (let i = 0; i < 4; i++) {
      const nx = location.x + dx[i];
      const ny = location.y + dy[i];
      const next = map.tryGet(nx, ny);
      const newDirection = directions[i];
      const isTurn = currentDirection !== null && currentDirection !== newDirection;
      const newStep = score + 1 + (isTurn ? turnPenalty : 0);

      if (next === '.' && !visited.has(`${nx},${ny}`)) {
        visited.add(`${nx},${ny}`);
        predecessor.set(`${nx},${ny}`, { point: location, direction: newDirection });
        queue.push({ point: { x: nx, y: ny } as Point, direction: newDirection, turns: turns + (isTurn ? 1 : 0), score: newStep, length: length + 1, path: [...path, { x: nx, y: ny }] });
      }
    }
  }
  return { score: queue.length, paths };
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const start = input.find('S')!;
  const result = walk2(input, start);

  let sum = 0;
  console.log('Found', result.paths.length, 'paths');
  for (const path of result.paths) {
    sum += path.length;
  }

  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `###########################
#######################..E#
######################..#.#
#####################..##.#
####################..###.#
###################..##...#
##################..###.###
#################..####...#
################..#######.#
###############..##.......#
##############..###.#######
#############..####.......#
############..###########.#
###########..##...........#
##########..###.###########
#########..####...........#
########..###############.#
#######..##...............#
######..###.###############
#####..####...............#
####..###################.#
###..##...................#
##..###.###################
#..####...................#
#.#######################.#
#S........................#
###########################`,
        expected: 21148,
      },
    ],
    solution: part1,
  },
  part2: {
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
        expected: 45,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
