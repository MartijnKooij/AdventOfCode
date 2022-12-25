import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput.split('\n');

const base = 5;
const offset = 2;

const fromSnafu = (s: string[]) => {
  const a = s.reverse();
  return a.reduce((a, c, i) => {
    let m = Number(c);
    if (c === '-') m = -1;
    if (c === '=') m = -2;
    return a + Math.pow(base, i) * m;
  }, 0);
};

const toSnafu = (n: number): string => {
  const digits = [];
  while (n > 0) {
    n += offset;
    digits.unshift(n % base);
    n = Math.floor(n / base);
  }
  return digits.map(d => '=-012'.charAt(d)).join('');
}

const part1 = (rawInput: string) => {
  return toSnafu(
    parseInput(rawInput)
      .map(s => fromSnafu(s.split('')))
      .reduce((p, c) => p + c, 0)
  );
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `
        1=-0-2
        12111
        2=0=
        21
        2=01
        111
        20012
        112
        1=-1=
        1-12
        12
        1=
        122`,
        expected: '2=-1=0',
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
  onlyTests: false,
});
