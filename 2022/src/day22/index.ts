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

type cube = { id: number, mapStart: point, map: string[][] };

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

  const faceSize = 4;

  const cubeMap: string[][] = [];
  for (let y = 0; y < faceSize; y++) {
    cubeMap.push(''.padEnd(faceSize, ' ').split(''));
  }

  const cubes: cube[] = [
    { id: 0, mapStart: { x: 404, y: 404 }, map: cubeMap }, // cube 0 does not exist...
    { id: 1, mapStart: { x: 8, y: 0 }, map: JSON.parse(JSON.stringify(cubeMap)) },
    { id: 2, mapStart: { x: 0, y: 4 }, map: JSON.parse(JSON.stringify(cubeMap)) },
    { id: 3, mapStart: { x: 4, y: 4 }, map: JSON.parse(JSON.stringify(cubeMap)) },
    { id: 4, mapStart: { x: 8, y: 4 }, map: JSON.parse(JSON.stringify(cubeMap)) },
    { id: 5, mapStart: { x: 8, y: 8 }, map: JSON.parse(JSON.stringify(cubeMap)) },
    { id: 6, mapStart: { x: 12, y: 8 }, map: JSON.parse(JSON.stringify(cubeMap)) }
  ];

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      for (const cube of cubes) {
        if (x >= cube.mapStart.x && x < cube.mapStart.x + faceSize &&
          y >= cube.mapStart.y && y < cube.mapStart.y + faceSize) {
          cube.map[y - cube.mapStart.y][x - cube.mapStart.x] = map[y][x];
        }
      }
    }
  }

  //fs.writeFileSync('./src/day22/map.txt', cubes.slice(1).map(cube => cube.map.map(row => row.join('')).join('\n')).join('\n\n'));

  const moveHorizontal = (map: string[][], currentPosition: point, count: number, direction: move): point => {
    for (let m = 0; m < count; m++) {
      let newPosition = { x: currentPosition.x + (direction === '>' ? 1 : -1), y: currentPosition.y };
      if (map[newPosition.y][newPosition.x] === ' ') {
        newPosition = direction === '>' ? findNextXWhenExitOnTheRight(map, currentPosition) : findNextXWhenExitOnTheLeft(map, currentPosition);
        if (map[newPosition.y][newPosition.x] !== '#') {
          currentPosition = newPosition;
        }
      } else if (map[newPosition.y][newPosition.x] !== '#') {
        currentPosition = newPosition;
      }
      map[currentPosition.y][currentPosition.x] = direction;
    }

    return currentPosition;
  }

  const isInCubeFace = (cubeIndex: number, position: point): boolean => {
    return position.x >= cubes[cubeIndex].mapStart.x && position.x < cubes[cubeIndex].mapStart.x + faceSize &&
      position.y >= cubes[cubeIndex].mapStart.y && position.y < cubes[cubeIndex].mapStart.y + faceSize
  }

  const findNextXWhenExitOnTheLeft = (map: string[][], currentPosition: point): point => {
    // Normal wrap around
    return { y: currentPosition.y, x: map[currentPosition.y].findLastIndex(p => p !== ' ') };
  }

  const findNextXWhenExitOnTheRight = (map: string[][], currentPosition: point): point => {
    if (isInCubeFace(1, currentPosition)) {
      // 1 > 6, moving <, invert y
      return { x: cubes[6].mapStart.x + faceSize - 1, y: faceSize - Math.floor((currentPosition.y + 1) / faceSize) };
    } else if (isInCubeFace(4, currentPosition)) {
      // 4 > 6, moving v, x becomes y offset
      console.log('Leaving 4 v 6?', Math.floor((currentPosition.y) / faceSize), { x: cubes[6].mapStart.x + faceSize - Math.floor((currentPosition.y + 1) / faceSize), y: cubes[6].mapStart.y });
      return { x: cubes[6].mapStart.x + Math.floor((currentPosition.y) / faceSize), y: cubes[6].mapStart.y };
    }

    // Normal wrap around
    return { y: currentPosition.y, x: map[currentPosition.y].findIndex(p => p !== ' ') };
  }

  const findNextYWhenExitOnTheBottom = (map: string[][], x: number): number => {
    for (let y = 0; y < map.length; y++) {
      if (map[y][x] !== ' ') return y;
    }
    return -1;
  }

  const findNextYWhenExitOnTheTop = (map: string[][], x: number): number => {
    for (let y = map.length - 1; y >= 0; y--) {
      if (map[y][x] !== ' ') return y;
    }
    return -1;
  }

  const moveVertical = (map: string[][], position: point, count: number, direction: move): point => {
    for (let m = 0; m < count; m++) {
      let newY = position.y + (direction === '^' ? -1 : 1);
      if (map[newY][position.x] === ' ') {
        newY = direction === '^' ? findNextYWhenExitOnTheTop(map, position.x) : findNextYWhenExitOnTheBottom(map, position.x);
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
