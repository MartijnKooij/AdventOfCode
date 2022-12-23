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

type elf = { id: number, current: point, next?: point, checkOrder: direction[] };

const parseInput = (rawInput: string) => rawInput.split('\n').map(l => l.split(''));

let map: string[][] = [];

const expandMap = (count: number): string[][] => {
  for (let c = 0; c < count; c++) {
    for (const column of map) {
      column.unshift('.');
      column.push('.');
    }

    map.unshift(''.padEnd(map[0].length, '.').split(''));
    map.push(''.padEnd(map[0].length, '.').split(''));
  }

  return map;
}

const getMapValue = (y: number, x: number): string => {
  if (y < 0 || y >= map.length || x < 0 || x >= map[0].length) {
    console.log('MAP IS TOO SMALL!');
    return '#'
  };
  return map[y][x];
}

const setMapValue = (y: number, x: number, value: string): void => {
  map[y][x] = value;
}

const isFree = (elf: elf): boolean => {
  return getMapValue(elf.current.y - 1, elf.current.x - 1) === '.' &&
    getMapValue(elf.current.y - 1, elf.current.x) === '.' &&
    getMapValue(elf.current.y - 1, elf.current.x + 1) === '.' &&
    getMapValue(elf.current.y, elf.current.x - 1) === '.' &&
    getMapValue(elf.current.y, elf.current.x + 1) === '.' &&
    getMapValue(elf.current.y + 1, elf.current.x - 1) === '.' &&
    getMapValue(elf.current.y + 1, elf.current.x) === '.' &&
    getMapValue(elf.current.y + 1, elf.current.x + 1) === '.';
}

const tryMove = (elf: elf, direction: direction): { moved: boolean, next: point } => {
  const checkPoints: point[] = directions.get(direction)!;
  let next: point = { x: 0, y: 0 };
  let isFree = true;
  for (const check of checkPoints) {
    next = { x: elf.current.x + check.x, y: elf.current.y + check.y };
    if (getMapValue(next.y, next.x) === '#') {
      isFree = false;
      break;
    }
  }
  if (isFree) {
    return { moved: true, next: { x: elf.current.x + checkPoints[1].x, y: elf.current.y + checkPoints[1].y } }
  }
  return { moved: false, next: { x: 0, y: 0 } };
}

const part1 = (rawInput: string) => {
  map = parseInput(rawInput);
  expandMap(10);
  const debugMaps: string[][][] = [];
  const elves: elf[] = [];

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (getMapValue(y, x) === '#') {
        elves.push({ id: elves.length, current: { x, y }, checkOrder: ['N', 'S', 'W', 'E'] });
      }
    }
  }

  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  let didAnyoneMove = false;
  // console.log('elves', elves.map(e => e.current), '\n', map.map(r => r.join('')).join('\n'));
  for (let round = 0; round < 10; round++) {
    didAnyoneMove = false;
    debugMaps.push(JSON.parse(JSON.stringify(map)));
    // Propose new locations
    for (const elf of elves) {
      elf.next = undefined;

      if (isFree(elf)) continue;
      for (const direction of elf.checkOrder) {
        const { moved, next } = tryMove(elf, direction);
        if (moved) {
          elf.next = next;
          break;
        }
      }
    }

    // Move
    const movingElves = elves.filter(e => !!e.next);
    for (const elf of movingElves) {
      didAnyoneMove = true;
      if (movingElves.some(e => e.next?.x === elf.next?.x && e.next?.y === elf.next?.y && e.id != elf.id)) continue;

      minX = Math.min(minX, elf.next?.x ?? Infinity);
      maxX = Math.max(maxX, elf.next?.x ?? -Infinity);
      minY = Math.min(minY, elf.next?.y ?? Infinity);
      maxY = Math.max(maxY, elf.next?.y ?? -Infinity);

      // console.log('moving', round, elf.id, elf.current, elf.next);
      setMapValue(elf.current.y, elf.current.x, '.');
      setMapValue(elf.next?.y!, elf.next?.x!, '#');
      elf.current = { x: elf.next?.x!, y: elf.next?.y! };
    }

    // Update check order
    for (const elf of elves) {
      elf.checkOrder.push(elf.checkOrder.shift()!);
    }

    // console.log('elves', elves.map(e => e.current));
    if (!didAnyoneMove) break;

    // Expand map if needed
    // if (Math.abs(minX - 1) > mapXOffset || Math.abs(minY - 1) > mapYOffset ||
    //   maxX - minX + 1 > map[0].length || maxY - minY + 1 > map.length) {
    //   if (minX - 1 < 0) mapXOffset = Math.abs(minX - 1);
    //   if (minY - 1 < 0) mapYOffset = Math.abs(minY - 1);

    //   console.log('expanding', minX, maxX, minY, maxY, mapXOffset, mapYOffset);

    //   expandMap();
    // }
  }
  debugMaps.push(JSON.parse(JSON.stringify(map)));

  const debugLog = debugMaps
    .map(map => map
      .map(row => row.join('')).join('\n'))
      .map((l, i) => `\n\n== End of Round ${i} ==\n` + l);
  fs.writeFileSync('./src/day23/map.txt', debugLog.join('\n'));
  console.log(minX, maxX, minY, maxY);
  let freeSpots = 0;
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      if (map[y][x] === '.') freeSpots++;
    }

  }

  return freeSpots;
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
  onlyTests: false,
});

