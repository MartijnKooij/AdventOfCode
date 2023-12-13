import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput.split('\n').map(l => {
  const p = l.split(' ');
  return {
    springs: p[0].split('').map(v => v === '?' ? '' : v),
    placements: p[1].split(',').map(Number)
  }
});

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

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
  const input = parseInput(rawInput);

  return;
};

function generatePermutations(map: string[], blocks: number[]): string[][] {
  let results: string[][] = [];
  let resultSet: Set<string> = new Set();
  let totalBlockLength = blocks.reduce((a, b) => a + b, 0);

  function canPlaceBlock(start: number, length: number, map: string[]): boolean {
    for (let i = start; i < start + length; i++) {
      if (map[i] !== '' && map[i] !== '#') {
        return false;
      }
    }
    return true;
  }

  function helper(start: number, blocks: number[], current: string[]): void {
    if (blocks.length === 0) {
      let next = current.slice();
      for (let i = 0; i < next.length; i++) {
        if (next[i] === '') {
          next[i] = '.';
        }
      }
      let resultString = next.join('');
      let blockCount = next.filter(x => x === '#').length;
      if (!resultSet.has(resultString) && blockCount === totalBlockLength) {
        resultSet.add(resultString);
        results.push(next);
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

  return results;
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
