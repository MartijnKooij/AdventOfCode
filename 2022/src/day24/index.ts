import run from 'aocrunner';
import * as fs from 'fs';

type point = { x: number, y: number };
type direction = '>' | 'v' | '<' | '^';
type blizzard = { direction: direction, position: point };
const directions = new Map<direction, point>([
  ['^', { x: 0, y: -1 }],
  ['>', { x: 1, y: 0 }],
  ['v', { x: 0, y: 1 }],
  ['<', { x: -1, y: 0 }]
]);


const parseInput = (rawInput: string) => rawInput.split('\n').map(l => l.split(''));

const moveBlizzard = (map: string[][], blizzard: blizzard): point => {
  const newPosition = {
    x: blizzard.position.x + directions.get(blizzard.direction)?.x!,
    y: blizzard.position.y + directions.get(blizzard.direction)?.y!
  }
  if (map[newPosition.y][newPosition.x] === '#') {
    switch (blizzard.direction) {
      case '^':
        newPosition.y = map.length - 2;
        break;
      case '>':
        newPosition.x = 1;
        break;
      case 'v':
        newPosition.y = 1;
        break;
      case '<':
        newPosition.x = map[0].length - 2;
        break;
      default:
        break;
    }
  }

  return newPosition;
}

const moveElves = (map: string[][], elfLocation: point): point => {
  for (const direction of directions.values()) {
    const testPosition: point = {
      x: elfLocation.x + direction.x,
      y: elfLocation.y + direction.y
    };
    if (testPosition.x >= 1 && testPosition.x < map[0].length - 1 &&
      testPosition.y >= 1 && testPosition.y < map.length - 1 &&
      map[testPosition.y][testPosition.x] === '.') {
      return testPosition;
    }
  }

  return elfLocation;
}

const getPossiblePositions = (map: string[][], elfLocation: point): point[] => {
  const positions: point[] = [];
  for (const direction of directions.values()) {
    const testPosition: point = {
      x: elfLocation.x + direction.x,
      y: elfLocation.y + direction.y
    };
    if (testPosition.x >= 0 && testPosition.x < map[0].length &&
      testPosition.y >= 0 && testPosition.y < map.length &&
      map[testPosition.y][testPosition.x] === '.') {
      positions.push(testPosition);
    }
  }

  // Should we allow standing still if there's empty space?
  if (elfLocation.x >= 1 && elfLocation.y >= 1 && elfLocation.x < map[0].length - 1 && elfLocation.y < map.length - 1) {
    if (
      map[elfLocation.y + directions.get('<')?.y!][elfLocation.x + directions.get('<')?.x!] !== '>' &&
      map[elfLocation.y + directions.get('>')?.y!][elfLocation.x + directions.get('>')?.x!] !== '<' &&
      map[elfLocation.y + directions.get('v')?.y!][elfLocation.x + directions.get('v')?.x!] !== '^' &&
      map[elfLocation.y + directions.get('^')?.y!][elfLocation.x + directions.get('^')?.x!] !== 'v') {
      positions.push({ x: elfLocation.x, y: elfLocation.y });
    }
  }

  return positions;
}


const dist = (start: point, end: point): number => Math.abs(end.x - start.x) + Math.abs(end.y - start.y);

const bfs = (map: string[][], blizzardMaps: string[][][], start: point, finish: point): number => {
  const visited = new Set<string>();

  const stack = [{ s: start, m: 0 }];
  while (stack.length) {
    const current = stack.shift()!;
    let { s, m } = current;

    // If the path becomes "too long", let it go...
    if (m >= 1000) continue;

    if ((s.x === finish.x && s.y === finish.y)) {
      // console.log('done?', s, finish, m);
      return m;
    }

    const visitedKey = `${s.x}-${s.y}-${m}`;
    if (visited.has(visitedKey)) continue;
    visited.add(visitedKey);

    const updatedMap = blizzardMaps[m + 1];
    // console.log(updatedMap.map(row => row.join('')).join('\n'), '\n', s, m);
    // console.log(s, m);

    const possiblePositions = getPossiblePositions(updatedMap, s);
    // No possible moves, wait for the blizzard to pass...
    if (possiblePositions.length === 0) {
      stack.push({ s, m: m + 1 });
      continue;
    }

    const candidates = possiblePositions.map(p => ({ distance: dist(p, finish), p }));
    candidates.sort((a, b) => (a.p.x === s.x && a.p.y === s.y) ? 9999 : a.distance - b.distance);
    // console.log(candidates);
    for (const candidate of candidates) {
      stack.push({ s: candidate.p, m: m + 1 });
    }
    // console.log('stack at end', stack);
  }

  return -1;
}

const runBlizzard = (blizzards: blizzard[], map: string[][], times: number): string[][] => {
  // // Clone not needed?
  const updatedMap = JSON.parse(JSON.stringify(map));
  const tempBlizzards = JSON.parse(JSON.stringify(blizzards));

  for (let run = 0; run < times; run++) {
    // Move blizzards
    for (const blizzard of tempBlizzards) {
      blizzard.position = moveBlizzard(updatedMap, blizzard);
    }

    // Reset map
    for (let y = 1; y < updatedMap.length - 1; y++) {
      for (let x = 1; x < updatedMap[y].length - 1; x++) {
        updatedMap[y][x] = '.';
      }
    }

    // Draw blizzards
    for (const blizzard of tempBlizzards) {
      updatedMap[blizzard.position.y][blizzard.position.x] = blizzard.direction;
    }
  }

  return updatedMap;
}

const part1 = (rawInput: string) => {
  // Should be 305???
  let map = parseInput(rawInput);
  let elfStart = { x: 1, y: 0 };
  // let elfFinish = { x: 6, y: 5 };
  let elfFinish = { x: 120, y: 26 };
  const blizzards: blizzard[] = []
  const blizzardMaps: string[][][] = [];

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (['>', 'v', '<', '^'].includes(map[y][x])) {
        blizzards.push({
          direction: map[y][x] as direction,
          position: { x, y }
        })
      }
    }
  }

  for (let b = 0; b < 1000; b++) {
    const m = runBlizzard(blizzards, map, b);
    blizzardMaps.push(m);
  }

  const minutes = bfs(map, blizzardMaps, elfStart, elfFinish);

  return minutes;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      // {
      //   input: `
      //   #.######
      //   #>>.<^<#
      //   #.<..<<#
      //   #>v.><>#
      //   #<^v^^>#
      //   ######.#`,
      //   expected: 18,
      // },
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
