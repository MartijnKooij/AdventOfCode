import run from 'aocrunner';
import * as crypto from 'crypto';
import { RingBuffer } from '../utils/ring-buffer.js';

type coordinate = {id: string, value: number};
const parseInput = (rawInput: string): coordinate[] => rawInput.split('\n').map((l) => {
  return { id: crypto.randomUUID(), value: Number(l) };
});

const part1 = (rawInput: string) => {
  const values = parseInput(rawInput);
  const coordinates = new RingBuffer<coordinate>(values.length);
  coordinates.fromArray(values)

  for (const value of values) {
    const indexOfItem = coordinates.toArray().findIndex(c => c.id === value.id);
    if (indexOfItem < 0) {
      console.log('Index not found', indexOfItem, value, coordinates.toArray());
      throw new Error('Item not found?');
    }

    coordinates.move(indexOfItem, indexOfItem + value.value);
  }

  console.log(coordinates.toArray());

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
        1
        2
        -3
        3
        -2
        0
        4`,
        expected: 3,
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
  trimTestInputs: true,
  onlyTests: true,
});
