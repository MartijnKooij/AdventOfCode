import run from 'aocrunner';
import * as fs from 'fs';

type Node = { x: number; y: number; sign: string; length: number; color: string };
type Direction = { x: number, y: number };
type Point = [number, number];

const parseInput = (rawInput: string) => rawInput;

const directions: Map<string, Direction> = new Map([
  ['R', { x: 1, y: 0 },],
  ['D', { x: 0, y: 1 },],
  ['L', { x: -1, y: 0 },],
  ['U', { x: 0, y: -1 }]
]);

const part1 = (rawInput: string) => {
  const data = parseInput(rawInput).split('\n').filter(l => !!l).map(l => {
    const p = l.split(' ');
    return {
      x: 0,
      y: 0,
      sign: p[0],
      length: Number(p[1]),
      color: p[2].replace('(', '').replace(')', '')
    } as Node;
  });
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

  floodFill(map, [120, 20], '#', '*');
  fs.writeFileSync('./map.txt', map.map(l => l.join('')).join('\n'));

  return map.flatMap(l => l).filter(s => s !== '.').length;
};

const part2 = (rawInput: string) => {
  const data = parseInput(rawInput).split('\n').filter(l => !!l).map(l => {
    const dict = ['R', 'D', 'L', 'U'];
    const p = l.split(' ');
    const color = p[2].replace('(', '').replace(')', '');
    const sign = dict[parseInt(color.substring(6, 7), 16)];
    const length = parseInt(color.substring(1, 6), 16);
    return {
      x: 0,
      y: 0,
      sign,
      length,
      color
    } as Node;
  });
  console.log('data', data);

  let x = 0, y = 0;
  let polygon = [[x, y]];

  for (let i = 0; i < data.length; i++) {
    switch (data[i].sign) {
      case 'R':
        x += data[i].length;
        break;
      case 'D':
        y -= data[i].length;
        break;
      case 'L':
        x -= data[i].length;
        break;
      case 'U':
        y += data[i].length;
        break;
    }
    polygon.push([x, y]);
  }
  console.log('polygon', polygon);

  const perimeter = data.reduce((p, c) => p + Math.abs(c.length), 0);
  console.log('perimeter', perimeter);

  const area = calculateArea(polygon);

  console.log('area', area, 952408144115 - (area - perimeter / 2 + 1) - perimeter);

  return area + (perimeter / 2 + 1);
};

function calculateArea(coords: number[][]): number {
  let area = 0;
  for (let i = 0; i < coords.length; i++) {
    const [x1, y1] = coords[i];
    const [x2, y2] = coords[(i + 1) % coords.length];
    area += (x1 + x2) * (y1 - y2);
  }
  return Math.abs(area) / 2;
}

function floodFill(map: string[][], start: Point, wall: string, fill: string): void {
  const visited: boolean[][] = Array.from({ length: map.length }, () => Array(map[0].length).fill(false));
  const queue: Point[] = [start];
  while (queue.length > 0) {
    const [y, x] = queue.shift() as Point;
    if (y < 0 || x < 0 || y >= map.length || x >= map[0].length || visited[y][x] || map[y][x] === wall) {
      continue;
    }
    visited[y][x] = true;
    map[y][x] = fill;
    queue.push([y - 1, x], [y + 1, x], [y, x - 1], [y, x + 1]);
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
      {
        input: `
        R 6 (#70c710)
        D 5 (#0dc571)
        L 2 (#5713f0)
        D 2 (#d2c081)
        R 2 (#59c680)
        D 2 (#411b91)
        L 5 (#8ceee2)
        U 2 (#caa173)
        L 1 (#1b58a2)
        U 2 (#caa171)
        R 2 (#7807d2)
        U 3 (#a77fa3)
        L 2 (#015232)
        U 2 (#7a21e3)
        `,
        expected: 952408144115,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
