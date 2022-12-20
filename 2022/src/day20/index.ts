import run from 'aocrunner';

const parseInput = (rawInput: string): number[] => rawInput.trim().split('\n').filter(l => !!l).map(l => Number(l.trim()));

const part1 = (rawInput: string) => {
  const source = parseInput(rawInput);
  const copy = [...source];

  for (const value of source) {
    console.log('before', value, copy.join(','));
    const valueIndex = copy.indexOf(value);

    copy.splice(valueIndex, 1);
    let newIndex = (valueIndex + value) % copy.length;
    // if (newIndex === 0) newIndex = copy.length -1;
    copy.splice(newIndex, 0, value);

    console.log('after', valueIndex, newIndex, copy.join(','));
  }

  const zeroIndex = copy.indexOf(0);
  console.log(copy.join(','), zeroIndex);

  if (copy.join(',') !== '1,2,-3,4,0,3,-2') console.error('out of order...'.toUpperCase());

  return [
    copy[(1000 + zeroIndex) % copy.length],
    copy[(2000 + zeroIndex) % copy.length],
    copy[(3000 + zeroIndex) % copy.length]
  ].reduce((p, c) => p + c, 0);
}

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
