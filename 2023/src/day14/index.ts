import run from 'aocrunner';
import * as fs from 'fs';

const parseInput = (rawInput: string) => rawInput.split('\n').map(l => l.split(''));

const part1 = (rawInput: string) => {
  const map = parseInput(rawInput);
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === 'O') {
        rollUp(map, x, y);
      }
    }
  }

  // fs.writeFileSync('./map.txt', map.map(l => l.join('')).join('\n'));

  let sum = 0;
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === 'O') {
        sum += map.length - y;
      }
    }
  }

  return sum;
};

const rollUp = (map: string[][], sx: number, sy: number) => {
  let ty = sy - 1;
  while (true) {
    if (ty >= 0 && map[ty][sx] === '.') {
      map[ty + 1][sx] = '.';
      map[ty][sx] = 'O';
      ty -= 1;
    } else {
      break;
    }
  }
}

const part2 = (rawInput: string) => {
  const map = parseInput(rawInput);
  let sum = 0;
  const finds = new Map<number, number[]>();
  const memo = new Map<string, number>();

  // fs.writeFileSync(`./mapstart.txt`, map.map(l => l.join('')).join('\n'));

  const cycles = 1000000000; // 1000000000;
  for (let i = 0; i < cycles; i++) {
    if (i % 1000000 === 0) {
      console.log('Still going', cycles - i, memo.size);
    }
    let key = '';
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        key += map[i][j];
      }
    }
    if (memo.has(key)) {
      sum = memo.get(key)!;
      continue;
    }

    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        if (map[y][x] === 'O') {
          rollDirection(map, x, y, 0, -1);
        }
      }
    }
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        if (map[y][x] === 'O') {
          rollDirection(map, x, y, -1, 0);
        }
      }
    }
    for (let y = map.length - 1; y >= 0; y--) {
      for (let x = map[y].length - 1; x >= 0; x--) {
        if (map[y][x] === 'O') {
          rollDirection(map, x, y, 0, 1);
        }
      }
    }
    for (let y = map.length - 1; y >= 0; y--) {
      for (let x = map[y].length - 1; x >= 0; x--) {
        if (map[y][x] === 'O') {
          rollDirection(map, x, y, 1, 0);
        }
      }
    }
    sum = calculateSum(map);
    memo.set(key, sum);

    // const indices = finds.get(sum) || [];
    // indices.push(i+1);
    // finds.set(sum, indices);
  }
  // fs.writeFileSync(`./mapend.txt`, map.map(l => l.join('')).join('\n'));

  // sum = 0;
  // finds.forEach((value, key) => {
  //   if (value.length > 1 && hasConsistentPattern(value)) {
  //     // console.log(key, value);

  //     const diff = (value[1] - value[0]);
  //     const steps = (1000000000 - value[0]) / diff + 1;
  //     if (Number.isInteger(steps)) {
  //       console.log('winner?', key, steps, diff);
  //       // if (steps * diff + value[0] == 1000000000) {
  //         sum = key;
  //       // }
  //     }

  //     // const terms = calculateTerms(value[0], diff, 1000000000);
  //     // console.log('t', key, terms);
  //     // if (terms * diff - 1 === 1000000000) {
  //     //   console.log('winner?', key);
  //     //   sum = key;
  //     // }
  //   }
  // });

  return sum;
};

function hasConsistentPattern(array: number[]): boolean {
  let difference = array[1] - array[0];

  for (let i = 2; i < array.length; i++) {
    if (array[i] - array[i - 1] !== difference) {
      return false;
    }
  }

  return true;
}

function calculateTerms(firstTerm: number, difference: number, target: number): number {
  return (target - firstTerm) / difference + 1;
}

const rollDirection = (map: string[][], sx: number, sy: number, dx: number, dy: number) => {
  let px = sx;
  let py = sy;
  let tx = sx + dx;
  let ty = sy + dy;
  while (true) {
    if (ty >= 0 && ty < map.length &&
      tx >= 0 && tx < map[0].length && map[ty][tx] === '.') {
      map[py][px] = '.';
      map[ty][tx] = 'O';
      px = tx;
      py = ty;
      tx = tx + dx;
      ty = ty + dy;
    } else {
      tx = px;
      ty = py;
      break;
    }
  }

  return { x: tx, y: ty };
}

function calculateSum(map: string[][]) {
  let sum = 0;
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === 'O') {
        sum += map.length - y;
      }
    }
  }
  return sum;
}

run({
  part1: {
    tests: [
      {
        input: `
        O....#....
        O.OO#....#
        .....##...
        OO.#O....O
        .O.....O#.
        O.#..O.#.#
        ..O..#O..O
        .......O..
        #....###..
        #OO..#....
        `,
        expected: 136,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        O....#....
        O.OO#....#
        .....##...
        OO.#O....O
        .O.....O#.
        O.#..O.#.#
        ..O..#O..O
        .......O..
        #....###..
        #OO..#....
        `,
        expected: 64,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});


