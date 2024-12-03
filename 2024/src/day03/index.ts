import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const muls = input.matchAll(/mul\(\d+,\d+\)/g);
  let sum = 0;

  for (const mul of muls) {
    const [a, b] = mul[0].match(/\d+/g)!.map(Number);
    sum += a * b;
  }

  return sum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const regexes = [/mul\(\d+,\d+\)/g, /do\(\)/g, /don\'t\(\)/g];
  const matches = [];
  let sum = 0;

  for (const regex of regexes) {
    for (const match of input.matchAll(regex)) {
      matches.push({ match: match[0], index: match.index });
    }
  }

  // Sort matches by their index
  matches.sort((a, b) => a.index - b.index);

  let enabled = true;
  for (const match of matches) {
    console.log(match);
    if (match.match === 'do()' && !enabled) {
      enabled = true;
      continue;
    }
    if (match.match === 'don\'t()' && enabled) {
      enabled = false;
      continue;
    }
    if (match.match === 'do()' || match.match === 'don\'t()') {
      continue;
    }

    if (enabled) {
      const [a, b] = match.match.match(/\d+/g)!.map(Number);
      sum += a * b;
    }
  }

  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`,
        expected: 161,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`,
        expected: 48,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
