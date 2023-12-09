import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split('\n').map(l => l.split(' ').map(Number));

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const output: number[] = [];
  input.forEach(sequence => {
    console.log('sequence', sequence);
    const nextValues = findNextSequence(sequence, [sequence[sequence.length - 1]]);
    console.log('nextValues', nextValues);
    output.push(nextValues.reduce((p, c) => p + c, 0));
  });

  return output.reduce((p, c) => p + c, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const output: number[] = [];
  input.forEach(sequence => {
    console.log('sequence', sequence);
    const nextValues = findPreviousSequence(sequence, [sequence[0]]);
    console.log('nextValues', nextValues);
    let sum = 0;
    nextValues.reverse().forEach(n => {
      sum = n - sum;
    });
    output.push(sum);
  });

  console.log('output', output);

  return output.reduce((p, c) => p + c, 0);
};

function findPreviousSequence(sequence: number[], nextValues: number[] = []): number[] {
  const nextSequence = findDifferences(sequence);

  if (nextSequence.every(n => n === 0)) {
    return nextValues; // No need to add the 0
  }

  nextValues.push(nextSequence[0]);
  return findPreviousSequence(nextSequence, nextValues);
}

function findNextSequence(sequence: number[], nextValues: number[] = []): number[] {
  const nextSequence = findDifferences(sequence);
  if (nextSequence.every(n => n === 0)) {
    return nextValues; // No need to add the 0
  }

  nextValues.push(nextSequence[nextSequence.length - 1]);
  return findNextSequence(nextSequence, nextValues);
}

function findDifferences(sequence: number[]): number[] {
  let differences: number[] = [];
  for (let i = 0; i < sequence.length - 1; i++) {
    differences.push(sequence[i + 1] - sequence[i]);
  }

  return differences;
}

run({
  part1: {
    tests: [
      {
        input: `
        0 3 6 9 12 15
        1 3 6 10 15 21
        10 13 16 21 30 45
        `,
        expected: 114,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        0 3 6 9 12 15
        1 3 6 10 15 21
        10 13 16 21 30 45
        `,
        expected: 2,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
