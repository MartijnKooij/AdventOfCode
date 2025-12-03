import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput.split('\n').map(line => line.split('').map(Number));

const part1 = (rawInput: string) => {
  const banks = parseInput(rawInput);
  let answer = 0;

  banks.forEach(bank => {
    let max = 0;
    for (let i = 0; i < bank.length; i++) {
      for (let j = i + 1; j < bank.length; j++) {
        const compare = Number(bank[i].toString() + bank[j].toString());
        if (compare > max) {
          max = compare;
        }
      }
    }
    answer += max;
  });

  return answer;
};

const part2 = (rawInput: string) => {
  const banks = parseInput(rawInput);
  let answer = 0;

  banks.forEach(bank => {
    let start = 0;
    let end = bank.length - 12;
    const highestNumbers = [];

    for (let i = 0; i < 12; i++) {
      const slice = bank.slice(start, end + 1);
      const highest = Math.max(...slice);
      highestNumbers.push(highest);
      start = slice.indexOf(highest) + start + 1;
      end = bank.length - (12 - i - 1);
    }
    if (highestNumbers.length === 12) {
      console.log('Highest Numbers:', highestNumbers.join(''));
      answer += Number(highestNumbers.join(''));
    } else {
      throw new Error('Did not find 12 highest numbers');
    }
  });

  return answer;
};

run({
  part1: {
    tests: [
      {
        input: `987654321111111
811111111111119
234234234234278
818181911112111
`,
        expected: 357,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `987654321111111
811111111111119
234234234234278
818181911112111
`,
        expected: 3121910778619,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
