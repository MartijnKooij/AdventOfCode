import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput.split('\n\n').map(section =>
  section.split('\n').map(line => line.split('-').map(Number))
);

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const freshIngredients = input[0];
  const yourIngredients = input[1].flat();
  let freshIngredientsCount = 0;


  for (const ingredient of yourIngredients) {
    for (const [min, max] of freshIngredients) {
      if (ingredient >= min && ingredient <= max) {
        freshIngredientsCount++;
        break;
      }
    }
  }

  return freshIngredientsCount;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const freshIngredients = input[0];
  let freshIngredientsCount = 0;

  const sortedRanges = [...freshIngredients].sort((a, b) => a[0] - b[0]);
  const mergedRanges: number[][] = [];

  for (const [min, max] of sortedRanges) {
    if (mergedRanges.length === 0) {
      mergedRanges.push([min, max]);
    } else {
      const last = mergedRanges[mergedRanges.length - 1];
      if (min <= last[1] + 1) {
        last[1] = Math.max(last[1], max);
      } else {
        mergedRanges.push([min, max]);
      }
    }
  }

  for (const [min, max] of mergedRanges) {
    freshIngredientsCount += (max - min + 1);
  }

  return freshIngredientsCount;
};

run({
  part1: {
    tests: [
      {
        input: `3-5
10-14
16-20
12-18

1
5
8
11
17
32
`,
        expected: 3,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `3-5
10-14
16-20
12-18

1
5
8
11
17
32
`,
        expected: 14,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
