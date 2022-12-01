import run from 'aocrunner';

const parseInput = (rawInput: string): number[] => {
  var lines = rawInput.split('\n');
  var elves = [];
  var sum = 0;

  lines.forEach(line => {
    if (!line) {
      elves.push(sum);
      sum = 0;
    } else {
      sum += parseInt(line, 10);
    }
  });

  elves.push(sum);

  return elves;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return Math.max.apply(Math, input);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).sort((a,b)=>b-a);

  return input[0] + input[1] + input[2];
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: '',
      // },
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
  onlyTests: false,
});
