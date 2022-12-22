import run from 'aocrunner';
import * as fs from 'fs';

type input = { moves: string[], map: string[][] };
type point = { x: number, y: number };
type move = '>' | 'v' | '<' | '^';

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
  const parseInput = (rawInput: string): input => {
    const blocks = rawInput.split('\n\n');

    return {
      moves: blocks[1].match(/(\d+)|([LR])/g) ?? [],
      map: blocks[0].split('\n').filter(l => !!l).map(l => l.split(''))
    }
  };

  const moveHorizontal = (map: string[][], position: point, count: number, direction: move): point => {
    for (let m = 0; m < count; m++) {
      let newX = position.x + (direction === '>' ? 1 : -1);
      if (map[position.y][newX] === ' ') {
        newX = direction === '>' ? map[position.y].findIndex(p => p !== ' ') : map[position.y].findLastIndex(p => p !== ' ');
        if (map[position.y][newX] !== '#') {
          position.x = newX;
        }
      } else if (map[position.y][newX] !== '#') {
        position.x = newX;
      }
      map[position.y][position.x] = direction;
    }

    return position;
  }

  const findFirstNonVoidY = (map: string[][], x: number): number => {
    for (let y = 0; y < map.length; y++) {
      if (map[y][x] !== ' ') return y;
    }
    return -1;
  }

  const findLastNonVoidY = (map: string[][], x: number): number => {
    for (let y = map.length - 1; y >= 0; y--) {
      if (map[y][x] !== ' ') return y;
    }
    return -1;
  }

  const moveVertical = (map: string[][], position: point, count: number, direction: move): point => {
    for (let m = 0; m < count; m++) {
      let newY = position.y + (direction === '^' ? -1 : 1);
      if (map[newY][position.x] === ' ') {
        newY = direction === '^' ? findLastNonVoidY(map, position.x) : findFirstNonVoidY(map, position.x);
        if (map[newY][position.x] !== '#') {
          position.y = newY;
        }
      } else if (map[newY][position.x] !== '#') {
        position.y = newY;
      }
      map[position.y][position.x] = direction;
    }

    return position;
  }

  const input = parseInput(rawInput);
  const { map, maxX, maxY } = drawMap(input);

  let position: point = { x: map[offset].findIndex(p => p === '.'), y: offset };

  console.log('start', position, input.moves);

  let currentDirection = 0;
  const availableMoves: move[] = ['>', 'v', '<', '^'];
  map[position.y][position.x] = availableMoves[currentDirection];
  for (const move of input.moves) {
    const moves = Number(move);
    console.log('Checking move', move, moves);

    if (isNaN(moves)) {
      currentDirection += move === 'R' ? 1 : -1;
      if (currentDirection < 0) currentDirection = availableMoves.length - 1;
      if (currentDirection >= availableMoves.length) currentDirection = 0;
      map[position.y][position.x] = availableMoves[currentDirection];

      // console.log('Turning', move, availableMoves[currentDirection]);
    } else {
      switch (availableMoves[currentDirection]) {
        case '>':
        case '<':
          // console.log('Moving horizontally', position, moves);
          position = moveHorizontal(map, position, moves, availableMoves[currentDirection]);
          // console.log('Moved horizontally', position, moves);
          break;
        case '^':
        case 'v':
          // console.log('Moving vertically', position, moves);
          position = moveVertical(map, position, moves, availableMoves[currentDirection]);
          // console.log('Moved vertically', position, moves);
          break;
        default:
          break;
      }
    }
    map[position.y][position.x] = availableMoves[currentDirection];
  }

  console.log('Done', position, availableMoves[currentDirection]);
  fs.writeFileSync('./src/day22/log.txt', JSON.stringify(input.moves));
  fs.writeFileSync('./src/day22/map.txt', map.map(row => row.join('')).join('\n'));

  return ((position.y) * 1000) + ((position.x) * 4) + currentDirection;
};

/* #############################
/* ######### PART 2 ############
/* ############################# */

const part2 = (rawInput: string) => {
  const parseInput = (rawInput: string): input => {
    const blocks = rawInput.split('\n\n');

    return {
      moves: blocks[1].match(/(\d+)|([LR])/g) ?? [],
      map: blocks[0].split('\n').filter(l => !!l).map(l => l.split(''))
    }
  };

  const offset = 0;
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

  const input = parseInput(rawInput);
  const { map, maxX, maxY } = drawMap(input);

  const cubes = Array.from(Array(4), () => Array.from(Array(4), () => new Array()));
  const cubeIds = new Set();
  for (let y = 0; y < map.length; y++) {
    const cubeY = Math.floor(y / 3);
    for (let x = 0; x < map[y].length; x++) {
      const cubeX = Math.floor(x / 4);
      if (map[y][x] === ' ') continue;
      cubeIds.add(cubeX + ',' + cubeY);
      console.log(cubeX, cubeY, x, y, map[y][x]);
      cubes[cubeY][cubeX].push(map[y][x]);
    }

  }

  console.log(cubeIds);

  return;
};

run({
  part1: {
    tests: [
      //       {
      //         input: `
      //         ...#
      //         .#..
      //         #...
      //         ....
      // ...#.......#
      // ........#...
      // ..#....#....
      // ..........#.
      //         ...#....
      //         .....#..
      //         .#......
      //         ......#.

      // 10R5L5R10L4R5L5`,
      //         expected: 6032,
      //       },
    ],
    solution: part1,
  },
  part2: {
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
        expected: 5031,
      },
    ],
    solution: part2,
  },
  trimTestInputs: false,
  onlyTests: true,
});
