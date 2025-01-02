import run from 'aocrunner';

const parseInput = (rawInput: string) => {
  const parts = rawInput.split('\n\n');
  return {
    designs: parts[0].split(',').map((x) => x.trim()),
    towels: parts[1].split('\n'),
  };
};

const getUsedDesigns = (towel: string, designs: string[]) => {
  const usedDesigns = new Set<string>();
  for (const design of designs) {
    if (towel.includes(design)) {
      usedDesigns.add(design);
    }
  }
  return Array.from(usedDesigns);
};

const findCombination = (designs: string[], towel: string, current: string): boolean => {
  if (current === towel) {
    return true;
  }
  if (current.length >= towel.length) {
    return false;
  }

  for (const design of designs) {
    if (findCombination(designs, towel, current + design)) {
      return true;
    }
  }

  return false;
};

const getDesignPermutations = (designs: string[], towel: string): boolean => {
  const usedDesigns = getUsedDesigns(towel, designs);
  return findCombination(usedDesigns, towel, '');
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let validCombinations = 0;

  for (let t = 0; t < input.towels.length; t++) {
    const towel = input.towels[t];
    console.log(t, towel);
    const found = getDesignPermutations(input.designs, towel);
    validCombinations += found ? 1 : 0;
  }

  return validCombinations;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb
`,
        expected: 6,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
