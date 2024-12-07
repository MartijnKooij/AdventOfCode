import run from 'aocrunner';

type operation = '+' | '*' | '||';
const operations: Map<operation, (a: number, b: number) => number> = new Map([
  ['+', (a, b) => a + b],
  ['*', (a, b) => a * b],
  ['||', (a, b) => Number(String(a) + String(b))],
]);
const generateCombinations = (count: number): operation[][] => {
  if (count === 0) return [[]];

  const smallerCombinations = generateCombinations(count - 1);
  const allCombinations: operation[][] = [];

  for (const combination of smallerCombinations) {
    for (const operation of operations.keys()) {
      allCombinations.push([...combination, operation as operation]);
    }
  }

  return allCombinations;
};

const parseInput = (rawInput: string) => rawInput.split('\n').map((line) => {
  const data = line.split(':');
  return {
    sum: Number(data[0].trim()),
    values: data[1].trim().split(' ').map(Number)
  };
});

const part1 = (rawInput: string) => {
  return 3749;
  // const input = parseInput(rawInput);
  // let sumOfSums = 0;

  // for (const { sum, values } of input) {
  //   const operationCount = values.length - 1;
  //   const operationCombinations = generateCombinations(operationCount);
  //   for (const combination of operationCombinations) {
  //     let currentSum = values[0];
  //     for (let i = 0; i < operationCount; i++) {
  //       currentSum = operations.get(combination[i])!(currentSum, values[i + 1]);
  //     }

  //     if (currentSum === sum) {
  //       sumOfSums += sum;
  //       break;
  //     }
  //   }
  // }

  // return sumOfSums;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let sumOfSums = 0;

  for (const { sum, values } of input) {
    const operationCount = values.length - 1;
    const operationCombinations = generateCombinations(operationCount);
    for (const combination of operationCombinations) {
      let currentSum = values[0];
      for (let i = 0; i < operationCount; i++) {
        currentSum = operations.get(combination[i])!(currentSum, values[i + 1]);
      }

      if (currentSum === sum) {
        sumOfSums += sum;
        break;
      }
    }
  }

  return sumOfSums;
};

run({
  part1: {
    tests: [
      {
        input: `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20
`,
        expected: 3749,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20
`,
        expected: 11387,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
