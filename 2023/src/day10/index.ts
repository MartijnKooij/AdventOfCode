import run from 'aocrunner';
import { LinkedList } from '../utils/node-list.js';
import * as fs from 'fs';

const parseInput = (rawInput: string) => rawInput.split('\n').map(line => line.split(''));;
class Pipe {
  constructor(public title: string, public x: number, public y: number) { }
}

const part1 = (rawInput: string) => {
  const map = parseInput(rawInput);
  let start = findCoordinates(map, 'S');

  let stop = 0;
  let previousStart = { ...start };
  const foundNodes: Pipe[] = [new Pipe('S', start.x, start.y)];
  while (true) {
    const nextNode = getSurroundingNodes(map, start.x, start.y).filter(surroundingNode => !foundNodes.some(f => f.x === surroundingNode.x && f.y === surroundingNode.y))[0];
    if (!nextNode || nextNode.title === 'S') {
      break;
    }
    foundNodes.push(nextNode);
    previousStart = { ...start };
    start = { x: nextNode.x, y: nextNode.y };

    stop++;
    if (stop > 100000) {
      return -1;
    }
  }

  return foundNodes.length / 2;
};

const part2 = (rawInput: string) => {
  const map = parseInput(rawInput);
  let start = findCoordinates(map, 'S');

  let stop = 0;
  let previousStart = { ...start };
  const foundNodes: Pipe[] = [new Pipe('S', start.x, start.y)];
  while (true) {
    const nextNode = getSurroundingNodes(map, start.x, start.y).filter(surroundingNode => !foundNodes.some(f => f.x === surroundingNode.x && f.y === surroundingNode.y))[0];
    if (!nextNode || nextNode.title === 'S') {
      break;
    }
    foundNodes.push(nextNode);
    previousStart = { ...start };
    start = { x: nextNode.x, y: nextNode.y };

    stop++;
    if (stop > 100000) {
      return -1;
    }
  }

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      map[y][x] = foundNodes.find(f => f.x === x && f.y === y) ? 'O' : '.';
    }
  }

  fs.writeFileSync('map.txt', map.map(x => x.join('')).join('\n'));

  let count = 0;
  console.log(map.length / 4, (map.length / 4) * 3);
  for (let y = map.length / 4; y < (map.length / 4) * 3; y++) {
    for (let x = map[y].length / 4; x < (map[y].length / 4) * 3; x++) {
      if (map[y][x] === '.') {
        count ++;
      }
    }
  }

  return count;
};

function findCoordinates(map: string[][], target: string): { x: number, y: number } {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === target) {
        return { x, y };
      }
    }
  }
  throw new Error(`Target ${target} not found?`);
}

function getSurroundingNodes(map: string[][], x: number, y: number): Pipe[] {
  const center = map[y][x];
  const directions: { [key: string]: [number, number][] } = {
    '|': [[-1, 0], [1, 0]], // vertical pipe, connects north and south
    '-': [[0, -1], [0, 1]], // horizontal pipe, connects east and west
    'L': [[-1, 0], [0, 1]], // 90-degree bend, connects north and east
    'J': [[-1, 0], [0, -1]], // 90-degree bend, connects north and west
    '7': [[1, 0], [0, -1]], // 90-degree bend, connects south and west
    'F': [[1, 0], [0, 1]], // 90-degree bend, connects south and east
    'S': [[-1, 0], [1, 0], [0, -1], [0, 1]], // "S" can connect in all directions
  };

  const validDirections = directions[center];
  const surroundingNodes: Pipe[] = [];
  for (const [dy, dx] of validDirections) {
    const newX = x + dx;
    const newY = y + dy;
    if (newX >= 0 && newX < map[0].length && newY >= 0 && newY < map.length) {
      const node = map[newY][newX];
      if (node in directions && directions[node].some(([y, x]) => y === -dy && x === -dx)) {
        surroundingNodes.push(new Pipe(node, newX, newY));
      }
    }
  }
  return surroundingNodes;
}

run({
  part1: {
    tests: [
      {
        input: `
        7-F7-
        .FJ|7
        SJLL7
        |F--J
        LJ.LJ`,
        expected: 8,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: `
      //   .F----7F7F7F7F-7....
      //   .|F--7||||||||FJ....
      //   .||.FJ||||||||L7....
      //   FJL7L7LJLJ||LJ.L-7..
      //   L--J.L7...LJS7F-7L7.
      //   ....F-J..F7FJ|L7L7L7
      //   ....L7.F7||L7|.L7L7|
      //   .....|FJLJ|FJ|F7|.LJ
      //   ....FJL-7.||.||||...
      //   ....L---J.LJ.LJLJ...`,
      //   expected: 4,
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
