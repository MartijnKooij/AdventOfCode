import run from 'aocrunner';
import * as fs from 'fs';

const parseInput = (rawInput: string) => {
  const blocks = rawInput.split('\n\n');

  return {
    moves: Array.from(blocks[1].matchAll(/(\d+)([LR])/g)).map(a => a.slice(1)).flat(),
    map: blocks[0].split('\n').filter(l => !!l).map(l => l.split(''))
  }
};


const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let maxX = 0;
  let maxY = 0;
  for (let y = 0; y < input.map.length; y++) {
    for (let x = 0; x < input.map[y].length; x++) {
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }

  const map: string[][] = [];
  for (let y = 0; y < maxY + 1; y++) {
    map.push(''.padEnd(maxX + 1, ' ').split(''));
  }

  for (let y = 0; y < input.map.length; y++) {
    for (let x = 0; x < input.map[y].length; x++) {
      map[y][x] = input.map[y][x];      
    }    
  }

  fs.writeFileSync('./src/day22/map.txt', map.map(row => row.join('')).join('\n'));

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
        ...#
        .#..
        #...
        ....
...#.......#
........#...
..#....#....
..........#.
        ...#....
        .....#..
        .#......
        ......#.

10R5L5R10L4R5L5`,
        expected: 6032,
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
  trimTestInputs: false,
  onlyTests: true,
});
