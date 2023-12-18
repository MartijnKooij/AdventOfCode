import run from 'aocrunner';
import * as fs from 'fs';

type Node = { x: number; y: number; sign: string; length: number; color: string };
type Direction = { x: number, y: number };
type Point = [number, number];

const parseInput = (rawInput: string) => rawInput.split('\n').filter(l => !!l).map(l => {
  const p = l.split(' ');
  return {
    x: 0,
    y: 0,
    sign: p[0],
    length: Number(p[1]),
    color: p[2].replace('(', '').replace(')', '')
  } as Node;
});

const directions: Map<string, Direction> = new Map([
  ['R', { x: 1, y: 0 },],
  ['D', { x: 0, y: 1 },],
  ['L', { x: -1, y: 0 },],
  ['U', { x: 0, y: -1 }]
]);

const part1 = (rawInput: string) => {
  const data = parseInput(rawInput);
  console.log('data', data);

  const nodes: Node[] = [];
  let x = 0;
  let y = 0;
  data.forEach(d => {
    for (let i = 0; i < d.length; i++) {
      x += directions.get(d.sign)!.x;
      y += directions.get(d.sign)!.y;
      nodes.push({ ...d, x, y });
    }
  });

  const minX = Math.abs(Math.min(...nodes.map(m => m.x)));
  const minY = Math.abs(Math.min(...nodes.map(m => m.y)));
  const width = minX + Math.max(...nodes.map(m => m.x)) + 1;
  const height = minY + Math.max(...nodes.map(m => m.y)) + 1;

  console.log('size', minX, minY, width, height);

  const map: string[][] = [];
  for (let y = 0; y < height; y++) {
    map.push([]);
    for (let x = 0; x < width; x++) {
      if (nodes.find(n => n.x === x - minX && n.y === y - minY)) {
        map[y][x] = '#';
      } else {
        map[y][x] = '.';
      }
    }
  }

  floodFill(map, [120,20], '#', '*');
  fs.writeFileSync('./map.txt', map.map(l => l.join('')).join('\n'));

  return map.flatMap(l => l).filter(s => s !== '.').length;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

function floodFill(map: string[][], start: Point, wall: string, fill: string): void {
  const stack: Point[] = [start];
  while (stack.length > 0) {
    const [y, x] = stack.pop() as Point;
    if (y < 0 || x < 0 || y >= map.length || x >= map[0].length || map[y][x] === wall || map[y][x] === fill) {
      continue;
    }
    map[y][x] = fill;
    stack.push([y - 1, x], [y + 1, x], [y, x - 1], [y, x + 1]);
  }
}

run({
  part1: {
    tests: [
      // {
      //   input: `
      //   R 6 (#70c710)
      //   D 5 (#0dc571)
      //   L 2 (#5713f0)
      //   D 2 (#d2c081)
      //   R 2 (#59c680)
      //   D 2 (#411b91)
      //   L 5 (#8ceee2)
      //   U 2 (#caa173)
      //   L 1 (#1b58a2)
      //   U 2 (#caa171)
      //   R 2 (#7807d2)
      //   U 3 (#a77fa3)
      //   L 2 (#015232)
      //   U 2 (#7a21e3)
      //   `,
      //   expected: 62,
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: `
      //   R 6 (#70c710)
      //   D 5 (#0dc571)
      //   L 2 (#5713f0)
      //   D 2 (#d2c081)
      //   R 2 (#59c680)
      //   D 2 (#411b91)
      //   L 5 (#8ceee2)
      //   U 2 (#caa173)
      //   L 1 (#1b58a2)
      //   U 2 (#caa171)
      //   R 2 (#7807d2)
      //   U 3 (#a77fa3)
      //   L 2 (#015232)
      //   U 2 (#7a21e3)
      //   `,
      //   expected: 62,
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
