import run from 'aocrunner';
import * as fs from 'fs';

type point = { x: number, y: number };
type direction = 'N' | 'E' | 'S' | 'W';
const directions = new Map<direction, point[]>([
  ['N', [{ x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 }]],
  ['E', [{ x: 1, y: -1 }, { x: 1, y: 0 }, { x: 1, y: 1 }]],
  ['S', [{ x: -1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 1 }]],
  ['W', [{ x: -1, y: -1 }, { x: -1, y: 0 }, { x: -1, y: 1 }]]
]);

type elf = { current: point, next?: point, checkOrder: direction[] };

const parseInput = (rawInput: string) => rawInput.split('\n').map(l => l.split(''));

const expandMap = (map: string[][]): string[][] => {
  for (let y = 0; y < map.length; y++) {
    map[y].unshift('.');
    map[y].push('.');
  }

  map.unshift(''.padEnd(map[0].length, '.').split(''));
  map.push(''.padEnd(map[0].length, '.').split(''));

  return map;
}

const isFree = (elf: elf, map: string[][]): boolean => {
  return map[elf.current.y - 1][elf.current.x - 1] === '.' &&
    map[elf.current.y - 1][elf.current.x] === '.' &&
    map[elf.current.y - 1][elf.current.x + 1] === '.' &&
    map[elf.current.y][elf.current.x - 1] === '.' &&
    map[elf.current.y][elf.current.x + 1] === '.' &&
    map[elf.current.y + 1][elf.current.x - 1] === '.' &&
    map[elf.current.y + 1][elf.current.x] === '.' &&
    map[elf.current.y + 1][elf.current.x + 1] === '.';
}

const tryMove = (elf: elf, map: string[][], direction: direction): { moved: boolean, next: point } => {
  const checkPoints: point[] = directions.get(direction)!;
  let next: point = { x: 0, y: 0 };
  for (const check of checkPoints) {
    next = { x: elf.current.x + check.x, y: elf.current.y + check.y };
    if (map[next.y][next.x] === '.') return { moved: true, next };
  }
  return { moved: false, next };
}

const part1 = (rawInput: string) => {
  let map = parseInput(rawInput);
  const elves: elf[] = [];

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === '#') {
        elves.push({ current: { x, y }, checkOrder: ['N', 'S', 'W', 'E'] });
      }
    }
  }

  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (let round = 0; round < 10; round++) {
    // Propose new locations
    for (const elf of elves) {
      elf.next = undefined;
      if (isFree(elf, map)) continue;
      for (const direction of elf.checkOrder) {
        const { moved, next } = tryMove(elf, map, direction);
        if (moved) {
          elf.next = next;
          break;
        }
      }
      elf.checkOrder.push(elf.checkOrder.shift()!);
    }

    // Move
    for (const elf of elves.filter(e => !!e.next)) {
      minX = Math.min(minX, elf.next?.x ?? Infinity);
      maxX = Math.max(maxX, elf.next?.x ?? -Infinity);
      minY = Math.min(minY, elf.next?.y ?? Infinity);
      maxY = Math.max(maxY, elf.next?.y ?? -Infinity);

      map[elf.current.y][elf.current.x] = '.';
      map[elf.next?.y!][elf.next?.x!] = '#';
    }

    // Expand map if needed
    if (maxX - minX > map[0].length || maxY - minY > map.length) {
      map = expandMap(map);
    }
  }

  fs.writeFileSync('./src/day23/map.txt', map.map(row => row.join('')).join('\n'));

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
        input: `
        ..............
        ..............
        .......#......
        .....###.#....
        ...#...#.#....
        ....#...##....
        ...#.###......
        ...##.#.##....
        ....#..#......
        ..............
        ..............
        ..............`,
        expected: 110,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: '',
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});

