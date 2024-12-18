import run from 'aocrunner';
import { Point } from '../utils/point.js';
import { AocMap } from '../utils/map.js';

const parseInput = (rawInput: string) => rawInput.split('\n').map((line) => {
  const [x, y] = line.split(',').map(Number);
  return { x, y } as Point;
});

function walk(map: AocMap, start: Point, end: Point) {
  const dx = [-1, 0, 1, 0];
  const dy = [0, 1, 0, -1];
  const queue: [Point, number][] = [[start, 0]];
  while (queue.length > 0) {
    const [location, step] = queue.shift()!;
    if (location.x === end.x && location.y === end.y) continue;
    for (let i = 0; i < 4; i++) {
      const nx = location.x + dx[i];
      const ny = location.y + dy[i];
      if (nx >= 0 && nx < map.length && ny >= 0 && ny < map[0].length && map[nx][ny] === '.') {
        map[nx][ny] = 'O';
        queue.push([[nx, ny], step + 1]);
      }
    }
    map[x][y] = '.';
  }
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const size = 6; // Real one has 70
  const bytes = 12; // Real one has 1024
  const start: Point = { x: 0, y: 0 }
  const end: Point = { x: size - 1, y: size - 1 };

  let tmpMap = '';
  for (let y = 0; y < size; y++) {
    tmpMap += '.'.repeat(size) + '\n';
  }
  const map = new AocMap(tmpMap);

  for (let b = 0; b < bytes; b++) {
  }
  console.log(map.toString());

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
        input: `5,4
4,2
4,5
3,0
2,1
6,3
2,4
1,5
0,6
3,3
2,6
5,1
1,2
5,5
2,5
6,5
1,4
0,4
6,4
1,1
6,1
1,0
0,5
1,6
2,0
`,
        expected: 22,
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
