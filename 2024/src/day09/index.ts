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
const parseInput2 = (rawInput: string) => {
  return rawInput.split('').map(Number).map((n, i) => ({ id: i % 2 === 0 ? Math.floor(i / 2) : null, type: i % 2 === 0 ? 'file' : 'space', size: n, moveable: true }));
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

  fs.writeFileSync('output.txt', sector.join(','));

  let sum = 0;
  for (let i = 0; i < sector.length; i++) {
    if (sector[i] !== '.') {
      sum += i * Number(sector[i]);
    }
  }

  return sum;
};

const part2 = (rawInput: string) => {
  let sector = parseInput2(rawInput);
  // console.log(sector);
  // console.log(sector.map(v => v.type === 'file' ? String(v.id).repeat(v.size) : '.'.repeat(v.size)).join(''));
  let loopCount = 0;

  while (true) {
    const lastFileIndex = sector.findLastIndex(v => v.type === 'file' && v.moveable);
    const file = { ...sector[lastFileIndex] };
    if (!file || lastFileIndex === 0) {
      break;
    }
    const availableIndex = sector.findIndex(v => v.type === 'space' && v.size >= file.size);
    if (availableIndex === -1 || availableIndex >= lastFileIndex) {
      const updatedFile = { ...sector[lastFileIndex], moveable: false };
      sector[lastFileIndex] = updatedFile;
      continue;
    }
    const space = { ...sector[availableIndex] };
    sector[lastFileIndex] = { type: 'space', size: file.size, id: null, moveable: false };
    sector[availableIndex] = { type: 'file', size: file.size, id: file.id, moveable: false };
    if (space.size > file.size) {
      sector.splice(availableIndex + 1, 0, { type: 'space', size: space.size - file.size, id: space.id, moveable: true });
    }
    // console.log(sector.map(v => v.type === 'file' ? String(v.id).repeat(v.size) : '.'.repeat(v.size)).join(''));

    loopCount++;
    if (loopCount > 10000) {
      break;
    }
  }

  // console.log(sector);
  // console.log(sector.map(v => v.type === 'file' ? String(v.id).repeat(v.size) : '.'.repeat(v.size)).join(''));

  let sum = 0;
  let index = 0;
  for (let i = 0; i < sector.length; i++) {
    for (let j = 0; j < sector[i].size; j++) {
      // console.log(index, sector[i].id);
      if (sector[i].type === 'file') {
        sum += index * Number(sector[i].id);
      }
      index++;
    }
  }

  return sum;
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
      {
        input: `2333133121414131402`,
        expected: 2858,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
