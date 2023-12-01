import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput.split('\n');

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input.map(l => l.replace(/\D/g, '')).map(l => Number(l[0] + l[l.length - 1])).reduce((p, c) => p + c, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input
    .map(l => {
      const digits = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',]
        .reduce((acc, word, index) => acc.replaceAll(word, word + (index + 1) + word), l)
        .split('')
        .map(Number)
        .filter(Boolean);

      return digits;
    })
    .map(digits => Number('' + digits[0] + digits[digits.length - 1]))
    .reduce((p, c) => p + c, 0);
};

run({
  part1: {
    tests: [
      {
        input: `1abc2
        pqr3stu8vwx
        a1b2c3d4e5f
        treb7uchet`,
        expected: 142,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `two1nine
        eightwothree
        abcone2threexyz
        xtwone3four
        4nineeightseven2
        zoneight234
        7pqrstsixteen
        eighthree
        sevenine`,
        expected: 443,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
