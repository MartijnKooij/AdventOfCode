import run from 'aocrunner';
import { AocMap } from '../utils/map.js';
import { Point } from '../utils/point.js';

const directionMap: { [key: string]: Point } =
{
  '^': { x: 0, y: -1 },
  'v': { x: 0, y: 1 },
  '<': { x: -1, y: 0 },
  '>': { x: 1, y: 0 }
};

const parseInput = (rawInput: string) => {
  const parts = rawInput.split('\n\n');
  return {
    map: new AocMap(parts[0]),
    moves: parts[1].replace(/\n/g, '').split('')
  }
};

const pushBoxes = (map: AocMap, location: Point, direction: Point) => {
  let pushedCount = 0;
  let nextLocation = { x: location.x + direction.x, y: location.y + direction.y };

  // Find the first open space in the specified direction
  while (true) {
    const next = map.tryGet(nextLocation.x, nextLocation.y);
    if (next === '.') {
      break;
    } else if (next !== 'O') {
      return pushedCount; // No open space found, cannot move
    }
    nextLocation = { x: nextLocation.x + direction.x, y: nextLocation.y + direction.y };
  }

  // Move each block from right to left (or bottom to top) one step
  while (nextLocation.x !== location.x || nextLocation.y !== location.y) {
    const prevLocation = { x: nextLocation.x - direction.x, y: nextLocation.y - direction.y };
    map.set(nextLocation.x, nextLocation.y, 'O');
    map.set(prevLocation.x, prevLocation.y, '.');
    nextLocation = prevLocation;
    pushedCount++;
  }

  // Move the robot to the new location
  map.set(location.x, location.y, '.');
  map.set(location.x + direction.x, location.y + direction.y, '@');

  return pushedCount;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const currentLocation = input.map.find('@')!;
  //console.log(input.map.toString());

  for (const move of input.moves) {
    // console.log(move);
    const nextLocation = { ...currentLocation };
    switch (move) {
      case '^':
        nextLocation.y--;
        break;
      case 'v':
        nextLocation.y++;
        break;
      case '<':
        nextLocation.x--;
        break;
      case '>':
        nextLocation.x++;
        break;
    }
    const next = input.map.tryGet(nextLocation.x, nextLocation.y);
    if (next === '.') {
      input.map.set(currentLocation.x, currentLocation.y, '.');
      input.map.set(nextLocation.x, nextLocation.y, '@');
      currentLocation.x = nextLocation.x;
      currentLocation.y = nextLocation.y;
    } else if (next === 'O') {
      const pushedCount = pushBoxes(input.map, currentLocation, directionMap[move] as Point);
      if (pushedCount > 0) {
        currentLocation.x = nextLocation.x;
        currentLocation.y = nextLocation.y;
      }
    }
    // console.log(input.map.toString());
  }

  // Collect all 0 locations
  const locations: Point[] = [];
  for (let y = 0; y < input.map.rows; y++) {
    for (let x = 0; x < input.map.columns; x++) {
      if (input.map.get(x, y) === 'O') {
        locations.push({ x, y });
      }
    }
  }
  console.log(input.map.toString());
  console.log(locations);
  let sum = 0;
  for (const location of locations) {
    sum += 100 * location.y + (location.x);
  }

  return sum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `##########
#..O..O.O#
#......O.#
#.OO..O.O#
#..O@..O.#
#O#..O...#
#O..O..O.#
#.OO.O.OO#
#....O...#
##########

<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^
`,
        expected: 10092,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
