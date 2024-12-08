import run from 'aocrunner';
import { AocMap } from '../utils/map.js';

type Point = { x: number; y: number };
const parseInput = (rawInput: string) => new AocMap(rawInput);
const findOtherAntennas = (map: AocMap, antennaX: number, antennaY: number) => {
  const antenna = map.values[antennaY][antennaX];
  const otherAntennas: Point[] = [];
  for (let y = 0; y < map.rows; y++) {
    for (let x = 0; x < map.columns; x++) {
      const cell = map.values[y][x];
      if (cell === antenna && x !== antennaX && y !== antennaY) {
        otherAntennas.push({ x, y });
      }
    }
  }
  return otherAntennas;
};

const part1 = (rawInput: string) => {
  const map = parseInput(rawInput);
  let antiNodes: Set<string> = new Set();
  for (let y = 0; y < map.rows; y++) {
    for (let x = 0; x < map.columns; x++) {
      const cell = map.values[y][x];
      if (cell !== '.' && cell !== '#') {
        const otherAntennas = findOtherAntennas(map, x, y);
        for (const { x: otherX, y: otherY } of otherAntennas) {
          const diffX = otherX - x;
          const diffY = otherY - y;
          const antiNode1 = { x: x - diffX, y: y - diffY };
          const antiNode2 = { x: otherX + diffX, y: otherY + diffY };
          if (antiNode1.x >= 0 && antiNode1.x < map.columns && antiNode1.y >= 0 && antiNode1.y < map.rows) {
            // map.values[antiNode1.y][antiNode1.x] = '#';
            antiNodes.add(`${antiNode1.x},${antiNode1.y}`);
          }
          if (antiNode2.x >= 0 && antiNode2.x < map.columns && antiNode2.y >= 0 && antiNode2.y < map.rows) {
            // map.values[antiNode2.y][antiNode2.x] = '#';
            antiNodes.add(`${antiNode2.x},${antiNode2.y}`);
          }
        }
      }
    }
  }

  return antiNodes.size;
};

const part2 = (rawInput: string) => {
  const map = parseInput(rawInput);
  let antiNodes: Set<string> = new Set();
  for (let y = 0; y < map.rows; y++) {
    for (let x = 0; x < map.columns; x++) {
      const cell = map.values[y][x];
      if (cell !== '.' && cell !== '#') {
        const otherAntennas = findOtherAntennas(map, x, y);
        for (const { x: otherX, y: otherY } of otherAntennas) {
          const diffX = otherX - x;
          const diffY = otherY - y;
          let loopCounter = 0;
          antiNodes.add(`${x},${y}${map.values[y][x]}`);
          const antiNode1 = { x: x - diffX, y: y - diffY };
          const antiNode2 = { x: otherX + diffX, y: otherY + diffY };
          while (true) {
            if (antiNode1.x >= 0 && antiNode1.x < map.columns && antiNode1.y >= 0 && antiNode1.y < map.rows) {
              // map.values[antiNode1.y][antiNode1.x] = '#';
              antiNodes.add(`${antiNode1.x},${antiNode1.y}${map.values[antiNode1.y][antiNode1.x]}`);
            }
            if (antiNode2.x >= 0 && antiNode2.x < map.columns && antiNode2.y >= 0 && antiNode2.y < map.rows) {
              // map.values[antiNode2.y][antiNode2.x] = '#';
              antiNodes.add(`${antiNode2.x},${antiNode2.y}${map.values[antiNode2.y][antiNode2.x]}`);
            }

            antiNode1.x -= diffX;
            antiNode1.y -= diffY;
            antiNode2.x += diffX;
            antiNode2.y += diffY;

            loopCounter++;
            if (loopCounter > 1000) {
              break;
            }
          }
        }
      }
    }
  }

  // console.log(map.toString());

  return antiNodes.size;
};

run({
  part1: {
    tests: [
      {
        input: `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............
`,
        expected: 14,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............
`,
        expected: 34,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
