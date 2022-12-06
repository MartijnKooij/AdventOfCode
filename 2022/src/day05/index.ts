import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput
    .split("\n\n")[1]
    .split("\n")
    .map((line) =>
      line
        .replace("move ", "")
        .replace("from ", "")
        .replace("to ", "")
        .split(" ")
        .map((s) => parseInt(s, 10))
    );

const moveCrate1 = (
  crates: string[],
  move: number,
  from: number,
  to: number
): string[] => {
  for (let index = 0; index < move; index++) {
    let stack = crates[from]
    const crate = stack.slice(stack.length - 1);
    crates[from] = stack.substring(0, stack.length - 1);
    crates[to] += crate;
  }

  return crates;
};

const moveCrate2 = (
  crates: string[],
  move: number,
  from: number,
  to: number
): string[] => {
  let stack = crates[from]
  const crate = stack.slice(stack.length - move);
  crates[from] = stack.substring(0, stack.length - move);
  crates[to] += crate;

  return crates;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  // let crates = ["", "ZN", "MCD", "P"];
  let crates = ['', 'JHGMZNTF', 'VWJ', 'GVLJBTH', 'BPJNCDVL', 'FWSMPRG', 'GHCFBNVM', 'DHGMR', 'HNMVZD', 'GNFH'];

  input.forEach((operation) => {
    crates = moveCrate1(crates, operation[0], operation[1], operation[2]);
  });

  let answer =  '';
  for (let index = 1; index < crates.length; index++) {
    const crate = crates[index];
    answer += crate.substring(crate.length - 1);    
  }

  return answer;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  // let crates = ["", "ZN", "MCD", "P"];
  let crates = ['', 'JHGMZNTF', 'VWJ', 'GVLJBTH', 'BPJNCDVL', 'FWSMPRG', 'GHCFBNVM', 'DHGMR', 'HNMVZD', 'GNFH'];

  input.forEach((operation) => {
    crates = moveCrate2(crates, operation[0], operation[1], operation[2]);
  });

  let answer =  '';
  for (let index = 1; index < crates.length; index++) {
    const crate = crates[index];
    answer += crate.substring(crate.length - 1);    
  }

  return answer;
};

run({
  part1: {
    tests: [
      {
        input: `
            [D]    
        [N] [C]    
        [Z] [M] [P]
         1   2   3 
        
        move 1 from 2 to 1
        move 3 from 1 to 3
        move 2 from 2 to 1
        move 1 from 1 to 2`,
        expected: "CMZ",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
            [D]    
        [N] [C]    
        [Z] [M] [P]
         1   2   3 
        
        move 1 from 2 to 1
        move 3 from 1 to 3
        move 2 from 2 to 1
        move 1 from 1 to 2`,
        expected: "MCD",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
