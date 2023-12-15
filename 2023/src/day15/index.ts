import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput.replaceAll('\n', '').split(',');

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let currentValue = 0;
  let sum = 0;

  input.forEach(key => {
    currentValue = 0;
    for (let c = 0; c < key.length; c++) {
        currentValue = ((currentValue + key.charCodeAt(c)) * 17) % 256;
    }
    sum += currentValue;
  });

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
        input: `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`,
        expected: 1320,
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
