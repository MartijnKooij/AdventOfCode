import run from 'aocrunner';

const parseInput = (rawInput: string) => {
  const input = rawInput.split("\n\n");
  return {
    rules: input[0].split("\n").map((rule) => rule.split('|').map(Number)),
    pages: input[1].split("\n").map(page => page.split(',').map(Number))
  }
};

const isValid = (pageIndex: number, pages: number[], rules: number[][]): boolean => {
  for (let r = 0; r < rules.length; r++) {
    if (rules[r][0] === pages[pageIndex]) {
      const otherPageIndex = pages.findIndex((p, i) => p === rules[r][1] && i !== pageIndex);
      if (otherPageIndex !== -1 && pageIndex > otherPageIndex) {
        return false;
      }
    }
    if (rules[r][1] === pages[pageIndex]) {
      const otherPageIndex = pages.findIndex((p, i) => p === rules[r][0] && i !== pageIndex);
      if (otherPageIndex !== -1 && pageIndex < otherPageIndex) {
        return false;
      }
    }
  }
  return true;
};

const fixOrder = (page: number[], rules: number[][]) => {
  while (true) {
    let allValid = true;

    for (let r = 0; r < rules.length; r++) {
      const pl = page.findIndex(p => p === rules[r][0]);
      const pr = page.findIndex(p => p === rules[r][1]);

      if (pl === -1 || pr === -1) {
        // One side does not exist
        continue;
      }
      if (pl < pr) {
        // Already in correct order
        continue;
      }

      // Swap the two
      allValid = false;
      const newPage = [...page];
      newPage[pl] = page[pr];
      newPage[pr] = page[pl];
      page = [...newPage];
    }
    if (allValid) {
      break;
    }
  }
  return page;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const validPages = new Set<number[]>();
  for (let p = 0; p < input.pages.length; p++) {
    const pages = input.pages[p];
    let allValid = true;
    for (let i = 0; i < pages.length; i++) {
      if (!isValid(i, pages, input.rules)) {
        allValid = false;
        break;
      }
    }
    if (allValid) {
      validPages.add(input.pages[p]);
    }
  }
  // console.log(validPages);

  let sum = 0;
  for (const page of validPages) {
    sum += page[Math.floor(page.length / 2)];
  }

  return sum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const invalidPages = new Set<number[]>();
  for (let p = 0; p < input.pages.length; p++) {
    const pages = input.pages[p];
    let allValid = true;
    for (let i = 0; i < pages.length; i++) {
      if (!isValid(i, pages, input.rules)) {
        allValid = false;
        break;
      }
    }
    if (!allValid) {
      invalidPages.add(input.pages[p]);
    }
  }
  console.log(invalidPages);

  let sum = 0;
  for (const page of invalidPages) {
    const fixedPage = fixOrder(page, input.rules);
    console.log(fixedPage, page);
    sum += fixedPage[Math.floor(fixedPage.length / 2)];
  }

  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47
`,
        expected: 143,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47
`,
        expected: 123,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
