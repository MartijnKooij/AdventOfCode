import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  for (let index = 0; index < input.length; index++) {
    const element = input.substring(index, index + 4);
    if (new Set(element).size === element.length) { 
      return index + 4;
      break;
    }
  }

  return;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  for (let index = 0; index < input.length; index++) {
    const element = input.substring(index, index + 14);
    if (new Set(element).size === element.length) { 
      return index + 14;
      break;
    }
  }

  return;
};

run({
  part1: {
    tests: [
      {
        input: `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`,
        expected: 10,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`,
        expected: 29,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
