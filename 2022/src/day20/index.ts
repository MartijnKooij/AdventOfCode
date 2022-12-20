import run from 'aocrunner';

type mixing = { id: number, value: number };
const parseInput = (rawInput: string): mixing[] => rawInput
  .split('\n')
  .map((l, i) => ({ id: i, value: Number(l) }));

const decrypt = (source: mixing[], copy: mixing[], repetitions = 1): mixing[] => {
  for (let r = 0; r < repetitions; r++) {
    for (const value of source) {
      const valueIndex = copy.findIndex(m => m.id == value.id);
      copy.splice(valueIndex, 1);
      copy.splice((valueIndex + value.value) % copy.length, 0, value);
    }
  }

  return copy;
}

const part1 = (rawInput: string) => {
  const source = parseInput(rawInput);
  const copy = [...source];

  decrypt(source, copy);

  const zeroIndex = copy.findIndex(m => m.value === 0);
  const points = [
    copy[(1000 + zeroIndex) % copy.length],
    copy[(2000 + zeroIndex) % copy.length],
    copy[(3000 + zeroIndex) % copy.length]
  ];
  return points.reduce((p, c) => p + c.value, 0);
}

const part2 = (rawInput: string) => {
  const source = parseInput(rawInput).map(m => ({...m, value: m.value *= 811589153}));
  const copy = [...source];

  decrypt(source, copy, 10);

  const zeroIndex = copy.findIndex(m => m.value === 0);
  const points = [
    copy[(1000 + zeroIndex) % copy.length],
    copy[(2000 + zeroIndex) % copy.length],
    copy[(3000 + zeroIndex) % copy.length]
  ];
  return points.reduce((p, c) => p + c.value, 0);
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
      {
        input: `
        1
        2
        -3
        3
        -2
        0
        4`,
        expected: 1623178306,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
