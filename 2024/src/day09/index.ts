import run from 'aocrunner';
import * as fs from 'fs';

const parseInput = (rawInput: string) => {
  let sector: string[] = [];
  rawInput.split('').map(Number).forEach((n, i) => {
    const id = Math.floor(i / 2);
    const type = i % 2 === 0 ? 'file' : 'space';
    if (type === 'file') {
      sector.push(...Array(n).fill(id));
    } else {
      sector.push(...Array(n).fill('.'));
    }
  });

  return sector;
};
const findLastFile = (values: string[]): { value: string, index: number } | null => {
  for (let i = values.length - 1; i >= 0; i--) {
    if (values[i] !== '.') {
      return { value: values[i], index: i };
    }
  }
  return null;
}

const part1 = (rawInput: string) => {
  let sector = parseInput(rawInput);

  while (true) {
    const firstSpace = sector.indexOf('.');
    const lastFileId = findLastFile(sector);
    if (!lastFileId || firstSpace >= lastFileId.index) {
      break;
    }
    sector[firstSpace] = lastFileId.value;
    sector[lastFileId.index] = '.';
  }

  fs.writeFileSync('output.txt', sector.join(''));

  let sum = 0;
  for (let i = 0; i < sector.length; i++) {
    if (sector[i] !== '.') {
      sum += i * Number(sector[i]);
    }
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
        input: `2333133121414131402`,
        expected: 1928,
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
  onlyTests: true,
});
