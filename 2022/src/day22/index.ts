import run from 'aocrunner';
import * as fs from 'fs';

type input = { moves: string[], map: string[][] };
type point = { x: number, y: number };

const parseInput = (rawInput: string): input => {
  const blocks = rawInput.split('\n\n');

  return {
    moves: Array.from(blocks[1].matchAll(/(\d+)([LR])/g)).map(a => a.slice(1)).flat(),
    map: blocks[0].split('\n').filter(l => !!l).map(l => l.split(''))
  }
};

const offset = 1;
const drawMap = (data: input) => {
  let maxX = 0;
  let maxY = 0;
  for (let y = 0; y < data.map.length; y++) {
    for (let x = 0; x < data.map[y].length; x++) {
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }

  const map: string[][] = [];
  for (let y = 0; y < maxY + 3; y++) {
    map.push(''.padEnd(maxX + 3, ' ').split(''));
  }

  for (let y = 0; y < data.map.length; y++) {
    for (let x = 0; x < data.map[y].length; x++) {
      map[y + offset][x + offset] = data.map[y][x];
    }
  }

  return { map, maxX: maxX + offset, maxY: maxY + offset };
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const { map, maxX, maxY } = drawMap(input);

  const velocity: point = { x: 0, y: 0 };
  const position: point = { x: map[offset].findIndex(p => p === '.'), y: offset };

  console.log('start', position);

  for (const move of input.moves) {
    const moves = Number(move);
    if (isNaN(moves)) {

    } else {
      for (let m = 0; m < moves; m++) {
        let newX = position.x + velocity.x;
        let newY = position.y + velocity.y;
        if (map[newY])
      }
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
