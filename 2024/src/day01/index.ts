import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput.split('\n').map(l => l.split(/\s+/).map(s => Number(s)));

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const left = input.map(l => l[0]).sort();
  const right = input.map(l => l[1]).sort();
  const diffs = [];

  for (let i = 0; i < left.length; i++) {
    diffs.push(Math.max(left[i], right[i]) - Math.min(left[i], right[i]));
  }

  return diffs.reduce((a, b) => a + b, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const left = input.map(l => l[0]);
  const right = input.map(l => l[1]);
  const totals = [];

  for (let i = 0; i < left.length; i++) {
    const num = left[i];
    const occ = right.reduce((count, current) => (current === num ? count + 1 : count), 0);
    totals.push(occ * num);
  }

  return totals.reduce((a, b) => a + b, 0);
};

run({
  part1: {
    tests: [
      {
        input: `
3   4
4   3
2   5
1   3
3   9
3   3
        `,
        expected: 11,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
3   4
4   3
2   5
1   3
3   9
3   3
        `,
        expected: 31,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
