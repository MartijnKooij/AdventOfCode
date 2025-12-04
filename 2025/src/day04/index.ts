import run from 'aocrunner';
import { AocMap } from '../utils/map.js';

const parseInput = (rawInput: string) => new AocMap(rawInput);

const part1 = (rawInput: string) => {
  const map = parseInput(rawInput);
  const drawMap = parseInput(rawInput);
  let answer = 0;

  for (let y = 0; y < map.rows; y++) {
    for (let x = 0; x < map.columns; x++) {
      const current = map.get(x, y);
      if (current !== '@') {
        continue;
      }
      const surrounding = map.getSurrounding(x, y);
      const rollCount = surrounding.filter((v) => v === '@').length;
      if (rollCount < 4) {
        drawMap.set(x, y, 'x');
        answer++;
      }
    }
  }

  // console.log(drawMap.toString());

  return answer;
};

const part2 = (rawInput: string) => {
  const map = parseInput(rawInput);
  let answer = 0;

  while (true) {
    const foundThisRound = markRolls(map);
    if (foundThisRound === 0) {
      break;
    }
    answer += foundThisRound;
  }

  console.log(map.toString());

  return answer;
};

function markRolls(map: AocMap): number {
  let foundThisRound = 0;
  for (let y = 0; y < map.rows; y++) {
    for (let x = 0; x < map.columns; x++) {
      const current = map.get(x, y);
      if (current !== '@') {
        continue;
      }
      const surrounding = map.getSurrounding(x, y);
      const rollCount = surrounding.filter((v) => v === '@').length;
      if (rollCount < 4) {
        map.set(x, y, 'x');
        foundThisRound++;
      }
    }
  }
  return foundThisRound;
}

run({
  part1: {
    tests: [
      {
        input: `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.
`,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.
`,
        expected: 43,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
