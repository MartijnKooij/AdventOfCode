import run from 'aocrunner';
import { Point } from '../utils/point.js';
import { AocMap } from '../utils/map.js';

const parseInput = (rawInput: string) => rawInput.split('\n').map((line) => {
  const [x, y] = line.split(',').map(Number);
  return { x, y } as Point;
});

const directions = [
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
  { x: 0, y: -1 },
];

const bfs = (map: AocMap, start: Point, end: Point, result: { answer: number }) => {
  const queue: { pos: Point, score: number }[] = [];
  const visited: { [key: string]: number } = {};
  result.answer = Infinity;
  queue.push({ pos: start, score: 0 });
  while (queue.length) {
    const { pos, score } = queue.shift()!;
    visited[`${pos.y},${pos.x}`] ||= Infinity;
    if (score >= visited[`${pos.y},${pos.x}`] || score >= result.answer) continue;
    if (pos.x === end.x && pos.y === end.y) {
      result.answer = score;
      continue;
    }
    visited[`${pos.y},${pos.x}`] = score;
    directions.forEach(({ x, y }) => {
      const newY = pos.y + y;
      const newX = pos.x + x;
      if (map.tryGet(newX, newY) !== '.') return;
      if (visited[`${newY},${newX}`] <= score + 1) return;
      queue.push({ pos: { x: newX, y: newY }, score: score + 1 });
    });
  }
}
const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const size = 71; // Real one has 71
  const bytes = 1024; // Real one has 1024
  const start: Point = { x: 0, y: 0 }
  const end: Point = { x: size - 1, y: size - 1 };

  let tmpMap = '';
  for (let y = 0; y < size; y++) {
    tmpMap += '.'.repeat(size) + '\n';
  }
  const map = new AocMap(tmpMap);

  for (let b = 0; b < bytes; b++) {
    map.trySet(input[b].x, input[b].y, '#');
  }
  const result = { answer: Infinity };
  bfs(map, start, end, result);
  // console.log(map.toString());
  console.log(result);

  return result.answer;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const size = 71; // Real one has 71
  const start: Point = { x: 0, y: 0 }
  const end: Point = { x: size - 1, y: size - 1 };

  let tmpMap = '';
  for (let y = 0; y < size; y++) {
    tmpMap += '.'.repeat(size) + '\n';
  }
  const map = new AocMap(tmpMap);

  for (let b = 0; b < input.length; b++) {
    map.trySet(input[b].x, input[b].y, '#');
    const result = { answer: Infinity };
    bfs(map, start, end, result);

    if (result.answer === Infinity) {
      console.log('Found', input[b]);
      return `${input[b].x},${input[b].y}`;
    }
  }

  return 'Not found';
};

run({
  part1: {
    tests: [
      //       {
      //         input: `5,4
      // 4,2
      // 4,5
      // 3,0
      // 2,1
      // 6,3
      // 2,4
      // 1,5
      // 0,6
      // 3,3
      // 2,6
      // 5,1
      // 1,2
      // 5,5
      // 2,5
      // 6,5
      // 1,4
      // 0,4
      // 6,4
      // 1,1
      // 6,1
      // 1,0
      // 0,5
      // 1,6
      // 2,0
      // `,
      //         expected: 22,
      //       },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: `5,4
      // 4,2
      // 4,5
      // 3,0
      // 2,1
      // 6,3
      // 2,4
      // 1,5
      // 0,6
      // 3,3
      // 2,6
      // 5,1
      // 1,2
      // 5,5
      // 2,5
      // 6,5
      // 1,4
      // 0,4
      // 6,4
      // 1,1
      // 6,1
      // 1,0
      // 0,5
      // 1,6
      // 2,0
      // `,
      //   expected: '6,1',
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
