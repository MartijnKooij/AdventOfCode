import run from 'aocrunner';
import * as fs from 'fs';

type Point = [number, number];
const parseInput = (rawInput: string) => rawInput.split('\n').filter(l => !!l).map(l => l.split(''));

const part1 = (rawInput: string) => {
  const map = parseInput(rawInput);

  walk(map, [65, 65], 64);
  fs.writeFileSync('./map.txt', map.map(l => l.join('')).join('\n'));

  return map.flatMap(l => l.filter(n => n === 'O')).length;
};

function walk(map: string[][], start: Point, maxSteps: number) {
  const dx = [-1, 0, 1, 0];
  const dy = [0, 1, 0, -1];
  const queue: [Point, number][] = [[start, 0]];
  while (queue.length > 0) {
    const [[x, y], step] = queue.shift()!;
    if (step >= maxSteps) continue;
    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];
      if (nx >= 0 && nx < map.length && ny >= 0 && ny < map[0].length && map[nx][ny] === '.') {
        map[nx][ny] = 'O';
        queue.push([[nx, ny], step + 1]);
      }
    }
    map[x][y] = '.';
  }
}
const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      // {
      //   input: `
      //   ...........
      //   .....###.#.
      //   .###.##..#.
      //   ..#.#...#..
      //   ....#.#....
      //   .##..S####.
      //   .##..#...#.
      //   .......##..
      //   .##.#.####.
      //   .##..##.##.
      //   ...........
      //   `,
      //   expected: 16,
      // },
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
