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
    const color = p[2].replace('(', '').replace(')', ''); // #0dc571
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

  const minX = minProperty(nodes, 'x');
  const minY = minProperty(nodes, 'y');
  const width = minX + maxProperty(nodes, 'x') + 1;
  const height = minY + maxProperty(nodes, 'y') + 1;

  console.log('size', minX, minY, width, height);

  const walls = new Set<string>();
  nodes.forEach(n => walls.add(`${n.y - minY},${n.x - minX}`));
  const centerX = Math.floor((minX + width - minX) / 2);
  const centerY = Math.floor((minY + height - minY) / 2);
  console.log('walls', walls.size, centerX, centerY);

  const filledMap = floodFill2(walls, [centerY, centerX], '*', width, height);
  // fs.writeFileSync('./map.txt', filledMap.);

  return filledMap.size + nodes.length;
};

function minProperty(nodes: Node[], property: keyof Node): number {
  let min = Infinity;
  for (const node of nodes) {
    const value = Math.abs(Number(node[property]));
    if (value < min) {
      min = value;
    }
  }
  return min;
}

function maxProperty(nodes: Node[], property: keyof Node): number {
  let max = -Infinity;
  for (const node of nodes) {
    const value = Number(node[property]);
    if (value > max) {
      max = value;
    }
  }
  return max;
}

function floodFill2(walls: Set<string>, start: Point, fill: string, width: number, height: number): Set<string> {
  const filled = new Set<string>();
  const queue: Point[] = [start];
  while (queue.length > 0) {
    const [y, x] = queue.shift() as Point;
    const key = `${y},${x}`;
    if (y < 0 || x < 0 || y >= height || x >= width || walls.has(key) || filled.has(key)) {
      continue;
    }
    filled.add(key);
    queue.push([y - 1, x], [y + 1, x], [y, x - 1], [y, x + 1]);
  }
  return filled;
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
  onlyTests: true,
});
