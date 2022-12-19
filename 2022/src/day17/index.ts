import run from 'aocrunner';
import * as fs from 'fs';

type point = { x: number, y: number };
type shape = {
  name: string,
  points: point[]
}
const rockShapes: shape[] = [
  {
    name: 'horizontal line',
    points: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }]
  },
  {
    name: 'plus',
    points: [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 2 }]
  },
  {
    name: 'inverted L',
    points: [{ x: 0, y: 0}, { x: 1, y: 0}, { x: 2, y: 0}, { x: 2, y: 1}, { x: 2, y: 2}]
  },
  {
    name: 'vertical line',
    points: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }]
  },
  {
    name: 'square',
    points: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }]
  }
];

const parseInput = (rawInput: string) => rawInput.split('');

const part1 = (rawInput: string) => {
  const jets = parseInput(rawInput);
  const fallenRocks: shape[] = [];

  let rockType = 0;
  let jetType = 0;
  for (let rockNumber = 0; rockNumber < 2022; rockNumber++) {
    const rock = JSON.parse(JSON.stringify(rockShapes[rockType])) as shape;

    let rockX = 2;
    let rockY = fallenRocks.length ? 4 + fallenRocks.flatMap(s => s.points).map(p => p.y).sort((a, b) => a < b ? 1 : -1)[0] : 3;
    for (const p of rock.points) {
      p.x += rockX;
      p.y += rockY;
    }

    while (true) {
      // console.log('start', jets[jetType], JSON.stringify(rock));
      let offsetX = jets[jetType] === '<' ? -1 : +1;
      let offsetY = -1;

      const hitsWall = rock.points.some(p => p.x + offsetX < 0 || p.x + offsetX >= 7);
      const hitsRockMovingHorizontal = fallenRocks
        .some(otherRock => otherRock.points
          .some(otherPoint => rock.points
            .some(rockPoint => rockPoint.x + offsetX === otherPoint.x && rockPoint.y === otherPoint.y)));
      if (!hitsWall && !hitsRockMovingHorizontal) {
        rockX += offsetX;
        for (const p of rock.points) {
          p.x += offsetX;
        }
      }

      const hitsFloor = rock.points.some(p => p.y + offsetY < 0);
      const hitsRockMovingVertical = fallenRocks
        .some(otherRock => otherRock.points
          .some(otherPoint => rock.points
            .some(rockPoint => rockPoint.x === otherPoint.x && rockPoint.y + offsetY === otherPoint.y)));
      if (!hitsFloor && !hitsRockMovingVertical) {
        rockY += offsetY;
        for (const p of rock.points) {
          p.y += offsetY;
        }
      }

      // console.log('end', jets[jetType], JSON.stringify(rock), hitsFloor, hitsRockMovingVertical);

      jetType++;
      if (jetType >= jets.length) jetType = 0;

      if (hitsFloor || hitsRockMovingVertical) {
        break;
      }
    }

    rockType++;
    if (rockType >= rockShapes.length) rockType = 0;
    fallenRocks.push(rock);
  }

  const map: string[][] = [];
  const maxY = fallenRocks.flatMap(s => s.points).map(p => p.y).sort((a, b) => a < b ? 1 : -1)[0];
  for (let y = 0; y < maxY + 1; y++) {
    map.push(''.padEnd(7, '.').split(''));
  }

  for (const rock of fallenRocks) {
    for (const p of rock.points) {
      map[p.y][p.x] = '#';
    }
  }
  fs.writeFileSync('./src/day17/map.txt', map.map(row => row.join('')).join('\n'));

  return maxY + 1;
};

const part2 = (rawInput: string) => {
  const jets = parseInput(rawInput);
  let fallenRocks: shape[] = [];

  let towerHeight = 0;

  let rockType = 0;
  let jetType = 0;
  for (let rockNumber = 0; rockNumber < 1000000000000; rockNumber++) {
    if (rockNumber % 100 === 0) {
      console.log('Still going...', rockNumber);
    }
    const rock = JSON.parse(JSON.stringify(rockShapes[rockType])) as shape;

    let rockX = 2;
    const currentHeight = towerHeight;
    let rockY = fallenRocks.length ? 4 + currentHeight : 3;
    for (const p of rock.points) {
      p.x += rockX;
      p.y += rockY;
    }

    while (true) {
      let offsetX = jets[jetType] === '<' ? -1 : +1;
      let offsetY = -1;

      const hitsWall = rock.points.some(p => p.x + offsetX < 0 || p.x + offsetX >= 7);
      const hitsRockMovingHorizontal = fallenRocks
        .some(otherRock => otherRock.points
          .some(otherPoint => rock.points
            .some(rockPoint => rockPoint.x + offsetX === otherPoint.x && rockPoint.y === otherPoint.y)));
      if (!hitsWall && !hitsRockMovingHorizontal) {
        rockX += offsetX;
        for (const p of rock.points) {
          p.x += offsetX;
        }
      }

      const hitsFloor = rock.points.some(p => p.y + offsetY < 0);
      const hitsRockMovingVertical = fallenRocks
        .some(otherRock => otherRock.points
          .some(otherPoint => rock.points
            .some(rockPoint => rockPoint.x === otherPoint.x && rockPoint.y + offsetY === otherPoint.y)));
      if (!hitsFloor && !hitsRockMovingVertical) {
        rockY += offsetY;
        for (const p of rock.points) {
          p.y += offsetY;
        }
      }

      jetType++;
      if (jetType >= jets.length) jetType = 0;

      if (hitsFloor || hitsRockMovingVertical) {
        break;
      }
    }

    rockType++;
    if (rockType >= rockShapes.length) rockType = 0;
    const rockHeight = rock.points.map(p => p.y).sort((a, b) => a < b ? 1 : -1)[0];
    fallenRocks.push(rock);
    fallenRocks = fallenRocks.slice(-500);
    if (rockHeight > towerHeight) {
      towerHeight = rockHeight;
    }
  }

  const maxY = towerHeight;
  return maxY + 1;
  // fs.writeFileSync('./src/day17/log.txt', combos.map(c => JSON.stringify(c)).join('\n'));

  // Test Data
  // return maxY + 1 + (Math.floor(999999999985 / 35) * 53);
  // Real Data Get height of 140 rocks + (999999999860 / 1730) * 2659
  // return maxY + 1 + (Math.floor(999999999860 / 1730) * 2659);
  // return 1536994219438 + 2701 + 240;
  // First 1739 give 2701 height.
  // Lots of whole cycles give 1536994219438 height.
  // Last 140 rocks starting with jet 2 give 240 height
};

run({
  part1: {
    tests: [
      // {
      //   input: `>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>`,
      //   expected: 3068,
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: `>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>`,
      //   expected: 1514285714288,
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
