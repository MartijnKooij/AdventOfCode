import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).split('\n').map(l => {
    const p = l.split(' ');
    return {
      springs: p[0].split('').map(v => v === '?' ? '' : v),
      placements: p[1].split(',').map(Number)
    }
  });

  // let permutations = generatePermutations(['', '', '', '.', '#', '#', '#'], [3, 1, 1]);
  // console.table(permutations);

  let sum = 0;
  for (let r = 0; r < input.length; r++) {
    const row = input[r];
    const permutations = generatePermutations(row.springs, row.placements);

    // console.log('row', r + 1);
    // console.log(row);
    // console.table(permutations);

    sum += permutations.length;
  }

  return sum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).split('\n').map(l => {
    const p = l.split(' ');
    return {
      springs: (p[0] + '?').repeat(5).split('').map(v => v === '?' ? '' : v),
      placements: (p[1] + ',').repeat(5).split(',').map(Number)
    }
  });

  // let permutations = generatePermutations(['', '', '', '.', '#', '#', '#'], [3, 1, 1]);
  // console.table(permutations);
  // console.table(input[0]);

  let sum = 0;
  for (let r = 0; r < input.length; r++) {
    const row = input[r];
    const permutations = generatePermutations(row.springs, row.placements);

    console.log('row', r, input.length, permutations.length);
    // console.table(row);
    // console.table(permutations);

    sum += permutations.length;
  }

  return sum;
};

function generatePermutations(map: string[], blocks: number[]): string[][] {
  let resultSet: Set<string> = new Set();
  let totalBlockLength = blocks.reduce((a, b) => a + b, 0);
  let memo = new Map<string, boolean>();
  let memClears = 0;

  function canPlaceBlock(start: number, length: number, map: string[]): boolean {
    const loopLength = start + length;
    for (let i = start; i < loopLength; i++) {
      if (map[i] !== '' && map[i] !== '#') {
        return false;
      }
    }
    return true;
  }

  function helper(start: number, blocks: number[], current: string[]): void {
    const remainingBlocksLength = blocks.reduce((a, b) => a + b, 0);
    const remainingSpaces = current.slice(start).filter(x => x === '').length;
    const remainingBlocks = current.slice(start).filter(x => x === '#').length;

    if (remainingBlocksLength > remainingSpaces + remainingBlocks) {
        return;
    }

    let key = start + blocks.join(',') + current.join(',');
    if (memo.has(key)) {
      return;
    }
    memo.set(key, true);
  
    if (memo.size % 100000 === 0) {
      console.log('memo and result size', memo.size + (memClears * 10000000), resultSet.size);
      if (memo.size % 10000000 === 0) {
        console.log('clearing memo...');
        memo.clear();
        memClears++;
      }
    }

    if (blocks.length === 0) {
      let next = current.slice();
      for (let i = 0; i < next.length; i++) {
        if (next[i] === '') {
          next[i] = '.';
        }
      }
      let resultString = next.join('');
      let blockCount = next.filter(x => x === '#').length;
      if (blockCount === totalBlockLength && !resultSet.has(resultString)) {
        resultSet.add(resultString);
      }
      return;
    }

    for (let i = start; i <= map.length - blocks[0]; i++) {
      if (canPlaceBlock(i, blocks[0], current)) {
        let next = current.slice();
        for (let j = 0; j < blocks[0]; j++) {
          next[i + j] = '#';
        }
        helper(i + blocks[0] + 1, blocks.slice(1), next);
      }
    }
  }

  helper(0, blocks, map.slice());

  return Array.from(resultSet.entries());
}

run({
  part1: {
    tests: [
      {
        input: `
        ???.### 1,1,3
        .??..??...?##. 1,1,3
        ?#?#?#?#?#?#?#? 1,3,1,6
        ????.#...#... 4,1,1
        ????.######..#####. 1,6,5
        ?###???????? 3,2,1`,
        expected: 21,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        ???.### 1,1,3
        .??..??...?##. 1,1,3
        ?#?#?#?#?#?#?#? 1,3,1,6
        ????.#...#... 4,1,1
        ????.######..#####. 1,6,5
        ?###???????? 3,2,1`,
        expected: 525152,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
