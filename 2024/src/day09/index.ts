import run from 'aocrunner';
import { get } from 'http';

type blockType = 'file' | 'space';
const parseInput = (rawInput: string) => rawInput.split('\n').map(l => {
  return l.split('').map(Number).map((n, i) => {
    return {
      id: Math.floor(i / 2),
      type: i % 2 === 0 ? 'space' : 'file' as blockType,
      size: n,
    };
  });
});
const getSpaceAvailable = (sector: { id: number, type: blockType, size: number }[]): number => {
  if (sector[sector.length - 1].type === 'file') {
    return sector.filter(b => b.type === 'space').reduce((acc, b) => acc + b.size, 0);
  }
  return sector.slice(0, sector.length - 1).filter(b => b.type === 'space').reduce((acc, b) => acc + b.size, 0);
};

const part1 = (rawInput: string) => {
  const sector = parseInput(rawInput)[0];
  let loopCount = 0;

  while (true) {
    const spaceAvailable = getSpaceAvailable(sector);
    if (spaceAvailable === 0) {
      break;
    }
    const lastFile = sector.findLast(b => b.type === 'file' && b.size > 0);
    if (!lastFile || lastFile.size > spaceAvailable) {
      break;
    }
    for (const block of sector) {
      if (block.type === 'space') {
        const blockSize = block.size;
        lastFile.size -= block.size;
        block.type = 'file';
        block.id = lastFile.id;
        if (lastFile.size === 0) {
          break;
        }
      }
    }
    loopCount++;
    if (loopCount > 1000) {
      break;
    }
  }

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
