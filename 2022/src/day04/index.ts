import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput
    .split("\n")
    .map((assignments) =>
      assignments
        .split(",")
        .map((set) => set.split("-").map((value) => parseInt(value, 10)))
    );

const part1 = (rawInput: string) => {
  const assignments = parseInput(rawInput);
  let points = 0;
  assignments.forEach((assignment) => {
    if (
      (assignment[0][0] >= assignment[1][0] &&
        assignment[0][1] <= assignment[1][1]) ||
      (assignment[1][0] >= assignment[0][0] &&
        assignment[1][1] <= assignment[0][1])
    ) {
      points++;
    }
  });

  return points;
};

const part2 = (rawInput: string) => {
  const assignments = parseInput(rawInput);
  let points = 0;
  assignments.forEach((assignment) => {
    if (
      (assignment[0][0] >= assignment[1][0] &&
        assignment[0][0] <= assignment[1][1]) ||
      (assignment[0][1] >= assignment[1][0] &&
        assignment[0][1] <= assignment[1][1]) ||
      (assignment[1][0] >= assignment[0][0] &&
        assignment[1][0] <= assignment[0][1]) ||
      (assignment[1][1] >= assignment[0][0] &&
        assignment[1][1] <= assignment[0][1])
    ) {
      points++;
    }
  });

  return points;
};

run({
  part1: {
    tests: [
      {
        input: `
        2-4,6-8
        2-3,4-5
        5-7,7-9
        2-8,3-7
        6-6,4-6
        2-6,4-8`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        2-4,6-8
        2-3,4-5
        5-7,7-9
        2-8,3-7
        6-6,4-6
        2-6,4-8`,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
