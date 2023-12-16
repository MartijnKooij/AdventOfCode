import run from 'aocrunner';
import * as fs from 'fs';

class Node {
  public energized: boolean = false;
  constructor(public sign: string) { }
}

type Direction = { x: number, y: number, beam: string, split?: boolean };

const directions: Map<string, Direction> = new Map([
  ['>.', { x: 1, y: 0, beam: '>' },],
  ['v.', { x: 0, y: 1, beam: 'v' },],
  ['<.', { x: -1, y: 0, beam: '<' },],
  ['^.', { x: 0, y: -1, beam: '^' }],
  ['>-', { x: 1, y: 0, beam: '>' },],
  ['v|', { x: 0, y: 1, beam: 'v' },],
  ['<-', { x: -1, y: 0, beam: '<' },],
  ['^|', { x: 0, y: -1, beam: '^' }],
  ['^/', { x: 1, y: 0, beam: '>' }],
  ['^B', { x: -1, y: 0, beam: '<' }],
  ['v/', { x: -1, y: 0, beam: '<' }],
  ['vB', { x: 1, y: 0, beam: '>' }],
  ['>/', { x: 0, y: -1, beam: '^' }],
  ['>B', { x: 0, y: 1, beam: 'v' }],
  ['</', { x: 0, y: 1, beam: 'v' }],
  ['<B', { x: 0, y: -1, beam: '^' }],
  ['<|', { x: 0, y: 1, beam: '^v', split: true }],
  ['>|', { x: 0, y: 1, beam: '^v', split: true }],
  ['v-', { x: 1, y: 0, beam: '<>', split: true }],
  ['^-', { x: 1, y: 0, beam: '<>', split: true }],
]);

const parseInput = (rawInput: string) => rawInput.replaceAll('\\', 'B').split('\n').map(l => l.split('').map(n => new Node(n.trim())));

const part1 = (rawInput: string) => {
  const map = parseInput(rawInput);

  followBeam(map, '>', 0, 0);

  fs.writeFileSync('./map.txt', map.map(l => l
    .map(n =>
      n.energized ? '#' : n.sign
    ).join('')).join('\n'));

  const result = map.flatMap(l => l.flatMap(n => n.energized));

  return result.filter(n => !!n).length;
};

const part2 = (rawInput: string) => {
  let map = parseInput(rawInput);

  const xw = map[0].length;
  const yh = map.length;
  const top: Direction[] = Array.from({length: xw}, (_, i) => ({ x: i, y: 0, beam: 'v' }));
  const bottom: Direction[] = Array.from({length: xw}, (_, i) => ({ x: i, y: yh-1, beam: '^' }));
  const left: Direction[] = Array.from({length: yh}, (_, i) => ({ x: 0, y: i, beam: '>' }));
  const right: Direction[] = Array.from({length: yh}, (_, i) => ({ x: xw-1, y: i, beam: '<' }));
  const starts: Direction[] = [...top, ...bottom, ...left, ...right];  

  let maxEnergy = 0;
  starts.forEach(s => {
    map = parseInput(rawInput);
    followBeam(map, s.beam, s.x, s.y);

    const result = map.flatMap(l => l.flatMap(n => n.energized));
  
    const energy = result.filter(n => !!n).length;
    if (energy > maxEnergy) {
      console.log('better!', maxEnergy, s);
      maxEnergy = energy;
    }
  });

  return maxEnergy;
};

function followBeam(map: Node[][], beam: string, x: number, y: number, checked: Direction[] = []) {
  let escape = 0;
  let newX = x;
  let newY = y;
  // let debug = false;
  // let rnd = Math.random();
  while (true) {
    // if (newY === 6 && newX === 7) {
    //   debug = true;
    // }
    // if (debug) {
    //   console.log('TOP OF THE LOOP', rnd, newX, newY, beam);
    // }
    if (newX < 0 || newX >= map[0].length || newY < 0 || newY >= map.length) {
      // if (debug) {
      //   console.log('breaking off...');
      // }
      break;
    }
    if (checked.some(d => d.x === newX && d.y === newY && d.beam === beam)) {
      // Already did this route.
      break;
    }
    checked.push({ x: newX, y: newY, beam });
    escape++;
    if (escape > 1000000) {
      break;
    }

    const currentNode = map[newY][newX];
    // if (debug) {
    //   console.log('currentNode', rnd, currentNode);
    // }

    currentNode.energized = true;
    const command = directions.get(beam + currentNode.sign)!;
    // if (!command) {
    //   debug = true;
    // }

    // if (debug) {
    //   console.log('beam', rnd, beam);
    //   console.log('sign', map[newY][newX].sign);
    //   console.log('command', command);
    // }
    if (command.split) {
      followBeam(map, command.beam.substring(0, 1), newX - command.x, newY - command.y, checked);
      followBeam(map, command.beam.substring(1, 2), newX + command.x, newY + command.y, checked);
      break;
    }

    newX = newX + command.x;
    newY = newY + command.y;
    beam = command.beam

    // if (debug) {
    //   console.log('debug next', newX, newY, beam);
    // }
  }
}

run({
  part1: {
    tests: [
      {
        input: fs.readFileSync('./src/day16/testinput.txt').toString(),
        expected: 46,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: fs.readFileSync('./src/day16/testinput.txt').toString(),
        expected: 51,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});


