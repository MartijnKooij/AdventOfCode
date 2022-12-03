import run from 'aocrunner';

const parseInput1 = (rawInput: string) => {
  return rawInput.split('\n').map((line) => [line.slice(0, line.length / 2), line.slice(line.length / 2, line.length)]);
};
const parseInput2 = (rawInput: string) => {
  return rawInput.split('\n');
};

const part1 = (rawInput: string) => {
  const input = parseInput1(rawInput);
  const pointValues = '_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let points = 0;
  input.forEach(bag => {
    for (var i = 0; i < bag[0].length; i++) {
      const item = bag[0].charAt(i);
      if (bag[1].indexOf(item) >= 0) {
        points += pointValues.indexOf(item);
        break;
      }
    }      
  });

  return points;
};

const part2 = (rawInput: string) => {
  const input = parseInput2(rawInput);
  const pointValues = '_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let points = 0;

  for (let groupStart = 0; groupStart < input.length; groupStart += 3) {
    for (var i = 0; i < input[groupStart + 0].length; i++) {
      const item = input[groupStart + 0].charAt(i);
      if (input[groupStart + 1].indexOf(item) >= 0 && input[groupStart + 2].indexOf(item) >= 0) {
        points += pointValues.indexOf(item);
        break;
      }
    }      
  }

  return points;
};

run({
  part1: {
    tests: [
      {
        input: `
        vJrwpWtwJgWrhcsFMMfFFhFp
        jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
        PmmdzqPrVvPwwTWBwg
        wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
        ttgJtRGJQctTZtZT
        CrZsJsPPZsGzwwsLwLmpwMDw`,
        expected: 157,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        vJrwpWtwJgWrhcsFMMfFFhFp
        jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
        PmmdzqPrVvPwwTWBwg
        wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
        ttgJtRGJQctTZtZT
        CrZsJsPPZsGzwwsLwLmpwMDw`,
        expected: 70
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
