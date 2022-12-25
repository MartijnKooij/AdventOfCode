import run from 'aocrunner';
import * as fs from 'fs';

type input = { moves: string[], map: string[][] };
type point = { x: number, y: number };
type direction = '>' | 'v' | '<' | '^';
type move = { d: direction, p: point };

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

  const moveHorizontal = (map: string[][], position: point, count: number, direction: direction): point => {
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

  const moveVertical = (map: string[][], position: point, count: number, direction: direction): point => {
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
  const availableMoves: direction[] = ['>', 'v', '<', '^'];
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

  const moveHorizontal = (map: string[][], currentMove: move, count: number): move => {
    const startingMove = currentMove.d;
    for (let m = 0; m < count; m++) {
      let newMove: move = { d: currentMove.d, p: { x: currentMove.p.x + (currentMove.d === '>' ? 1 : -1), y: currentMove.p.y } };
      if (map[newMove.p.y][newMove.p.x] === ' ') {
        newMove = currentMove.d === '>' ? findNextXWhenExitOnTheRight(map, currentMove.p) : findNextXWhenExitOnTheLeft(map, currentMove.p);
        if (map[newMove.p.y][newMove.p.x] !== '#') {
          currentMove = newMove;
        }
      } else if (map[newMove.p.y][newMove.p.x] !== '#') {
        currentMove = newMove;
      }
      map[currentMove.p.y][currentMove.p.x] = currentMove.d;
      if (currentMove.d !== startingMove && (currentMove.d === 'v' || currentMove.d === '^')) {
        return moveVertical(map, currentMove, count - m);
      }
    }

    return currentMove;
  }

  const moveVertical = (map: string[][], currentMove: move, count: number): move => {
    const startingMove = currentMove.d;
    for (let m = 0; m < count; m++) {
      let newMove: move = { d: currentMove.d, p: { x: currentMove.p.x, y: currentMove.p.y + (currentMove.d === '^' ? -1 : 1) } };
      if (map[newMove.p.y][newMove.p.x] === ' ') {
        newMove = currentMove.d === '^' ? findNextYWhenExitOnTheTop(map, currentMove.p) : findNextYWhenExitOnTheBottom(map, currentMove.p);
        if (map[newMove.p.y][newMove.p.x] !== '#') {
          currentMove = newMove;
        }
      } else if (map[newMove.p.y][newMove.p.x] !== '#') {
        currentMove = newMove;
      }
      map[currentMove.p.y][currentMove.p.x] = currentMove.d;
      if (currentMove.d !== startingMove && (currentMove.d === '<' || currentMove.d === '>')) {
        return moveHorizontal(map, currentMove, count - m);
      }
    }

    return currentMove;
  }

  const isInCubeFace = (cubeIndex: number, position: point): boolean => {
    return position.x >= cubes[cubeIndex].mapStart.x && position.x < cubes[cubeIndex].mapStart.x + faceSize &&
      position.y >= cubes[cubeIndex].mapStart.y && position.y < cubes[cubeIndex].mapStart.y + faceSize
  }

  const yToXOffset = (x: number, yCube: number): number => {
    return cubes[yCube].mapStart.y + 1 + (x % faceSize);
  }

  const xToYOffset = (y: number, xCube: number): number => {
    return cubes[xCube].mapStart.x + 1 + (y % faceSize);
  }

  const invert = (xy: number): number => {
    return faceSize - ((xy + 1) % faceSize);
  }

  const findNextXWhenExitOnTheLeft = (map: string[][], currentPosition: point): move => {
    if (isInCubeFace(1, currentPosition)) {
      // 1 > 3, moving v, x becomes y offset
      return { d: 'v', p: { x: xToYOffset(currentPosition.y, 3), y: cubes[3].mapStart.y } };
    } else if (isInCubeFace(2, currentPosition)) {
      // 2 > 6, moving ^, y becomes x offset
      return { d: '^', p: { x: cubes[6].mapStart.x, y: yToXOffset(currentPosition.x, 6) } };
    } else if (isInCubeFace(5, currentPosition)) {
      // 5 > 3, moving ^, y becomes x offset
      return { d: '^', p: { x: cubes[3].mapStart.x, y: yToXOffset(currentPosition.x, 3) } };
    }

    // Normal wrap around
    return { d: '<', p: { y: currentPosition.y, x: map[currentPosition.y].findLastIndex(p => p !== ' ') } };
  }

  const findNextXWhenExitOnTheRight = (map: string[][], currentPosition: point): move => {
    if (isInCubeFace(1, currentPosition)) {
      // 1 > 6, moving <, invert y
      return { d: '<', p: { x: cubes[6].mapStart.x + faceSize - 1, y: invert(currentPosition.y) } };
    } else if (isInCubeFace(4, currentPosition)) {
      // 4 > 6, moving v, x becomes y offset
      return { d: 'v', p: { x: xToYOffset(currentPosition.y, 6), y: cubes[6].mapStart.y } };
    } else if (isInCubeFace(6, currentPosition)) {
      // 6 > 1, moving <, y inverted
      return { d: '<', p: { x: cubes[1].mapStart.x + faceSize - 1, y: invert(currentPosition.y) } };
    }

    // Normal wrap around
    return { d: '>', p: { y: currentPosition.y, x: map[currentPosition.y].findIndex(p => p !== ' ') } };
  }

  const findNextYWhenExitOnTheBottom = (map: string[][], currentPosition: point): move => {
    if (isInCubeFace(2, currentPosition)) {
      // 2 > 5, moving ^, invert x
      return { d: '^', p: { x: invert(currentPosition.x), y: cubes[5].mapStart.y + faceSize - 1 } };
    } else if (isInCubeFace(3, currentPosition)) {
      // 3 > 5, moving >, x becomes y offset
      return { d: '>', p: { x: xToYOffset(currentPosition.y, 5), y: cubes[5].mapStart.y } };
    } else if (isInCubeFace(5, currentPosition)) {
      // 5 > 2, moving ^, invert x
      return { d: '^', p: { x: invert(currentPosition.x), y: cubes[2].mapStart.y + faceSize - 1 } };
    } else if (isInCubeFace(6, currentPosition)) {
      // 6 > 2, moving >, x becomes y offset
      return { d: '>', p: { x: xToYOffset(currentPosition.y, 2), y: cubes[2].mapStart.y } };
    }

    // Normal wrap around
    for (let y = 0; y < map.length; y++) {
      if (map[y][currentPosition.x] !== ' ') return { d: 'v', p: { y, x: currentPosition.y } };
    }
    throw new Error('findNextYWhenExitOnTheBottom: Unable to wrap?');
  }

  const findNextYWhenExitOnTheTop = (map: string[][], currentPosition: point): move => {
    if (isInCubeFace(1, currentPosition)) {
      // 1 > 2, moving v, invert x
      return { d: 'v', p: { x: invert(currentPosition.x), y: cubes[2].mapStart.y } };
    } else if (isInCubeFace(2, currentPosition)) {
      // 2 > 1, moving v, invert x
      return { d: 'v', p: { x: invert(currentPosition.x), y: cubes[1].mapStart.y } };
    } else if (isInCubeFace(3, currentPosition)) {
      // 3 > 1, moving >, y becomes x
      return { d: '>', p: { x: cubes[1].mapStart.x, y: cubes[1].mapStart.y + currentPosition.x - 1 } };
    } else if (isInCubeFace(6, currentPosition)) {
      // 6 > 4, moving <, x becomes y offset
      return { d: '<', p: { x: xToYOffset(currentPosition.y, 4), y: cubes[2].mapStart.y + faceSize - 1 } };
    }

    // Normal wrap around
    for (let y = map.length - 1; y >= 0; y--) {
      if (map[y][currentPosition.x] !== ' ') return { d: 'v', p: { y, x: currentPosition.y } };
    }
    throw new Error('findNextYWhenExitOnTheTop: Unable to wrap?');
  }

  let position: point = { x: map[offset].findIndex(p => p === '.'), y: offset };

  console.log('start', position, input.moves);

  let currentDirection = 0;
  const availableMoves: direction[] = ['>', 'v', '<', '^'];
  map[position.y][position.x] = availableMoves[currentDirection];
  let escape = 0;
  for (const move of input.moves) {
    escape++;
    // if (escape > 9) break;
    const moves = Number(move);
    console.log('Checking move', move, moves);

    if (isNaN(moves)) {
      currentDirection += move === 'R' ? 1 : -1;
      if (currentDirection < 0) currentDirection = availableMoves.length - 1;
      if (currentDirection >= availableMoves.length) currentDirection = 0;
      map[position.y][position.x] = availableMoves[currentDirection];
      console.log('Turning', move, availableMoves[currentDirection]);
    } else {
      let currentMove: move = { d: availableMoves[currentDirection], p: position };

      switch (currentMove.d) {
        case '>':
        case '<':
          console.log('Moving horizontally', currentMove.d, currentMove.p, moves);
          currentMove = moveHorizontal(map, currentMove, moves);
          console.log('Moved horizontally', currentMove.d, currentMove.p, moves);
          break;
        case '^':
        case 'v':
          console.log('Moving vertically', currentMove.d, currentMove.p, moves);
          currentMove = moveVertical(map, currentMove, moves);
          console.log('Moved vertically', currentMove.d, currentMove.p, moves);
          break;
        default:
          break;
      }
      position = currentMove.p
      currentDirection = availableMoves.indexOf(currentMove.d);
      console.log('changed direction', currentDirection);
      map[position.y][position.x] = currentMove.d;
    }
  }

  console.log('Done', position, availableMoves[currentDirection]);
  fs.writeFileSync('./src/day22/log.txt', JSON.stringify(input.moves));
  fs.writeFileSync('./src/day22/map.txt', map.map(row => row.join('')).join('\n'));

  return ((position.y + 1) * 1000) + ((position.x + 1) * 4) + currentDirection;
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
