import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput
    .split("\n")
    .map((l) => {
      if (l === "noop") return 0;
      return [0, parseInt(l.replace("addx ", ""), 10)];
    })
    .flat();

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const score =
    input.slice(0, 20 - 1).reduce((p, c) => p + c, 1) * 20 +
    input.slice(0, 60 - 1).reduce((p, c) => p + c, 1) * 60 +
    input.slice(0, 100 - 1).reduce((p, c) => p + c, 1) * 100 +
    input.slice(0, 140 - 1).reduce((p, c) => p + c, 1) * 140 +
    input.slice(0, 180 - 1).reduce((p, c) => p + c, 1) * 180 +
    input.slice(0, 220 - 1).reduce((p, c) => p + c, 1) * 220;

  return score;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const screen: string[][] = [
    "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx".split(""),
    "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx".split(""),
    "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx".split(""),
    "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx".split(""),
    "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx".split(""),
    "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx".split(""),
  ];

  let spritePosition = 1;
  let cycle = 0;

  for (let row = 0; row < 6; row++) {
    for (let x = 0; x < 40; x++) {
      if (x >= spritePosition - 1 && x <= spritePosition + 1) {
        screen[row][x] = "#";
      } else {
        screen[row][x] = ".";
      }
      spritePosition += input[cycle];
      cycle++;
    }
  }

  console.log(screen.map((r) => r.join("")));

  return;
};

run({
  part1: {
    tests: [
      {
        input: `
        addx 15
        addx -11
        addx 6
        addx -3
        addx 5
        addx -1
        addx -8
        addx 13
        addx 4
        noop
        addx -1
        addx 5
        addx -1
        addx 5
        addx -1
        addx 5
        addx -1
        addx 5
        addx -1
        addx -35
        addx 1
        addx 24
        addx -19
        addx 1
        addx 16
        addx -11
        noop
        noop
        addx 21
        addx -15
        noop
        noop
        addx -3
        addx 9
        addx 1
        addx -3
        addx 8
        addx 1
        addx 5
        noop
        noop
        noop
        noop
        noop
        addx -36
        noop
        addx 1
        addx 7
        noop
        noop
        noop
        addx 2
        addx 6
        noop
        noop
        noop
        noop
        noop
        addx 1
        noop
        noop
        addx 7
        addx 1
        noop
        addx -13
        addx 13
        addx 7
        noop
        addx 1
        addx -33
        noop
        noop
        noop
        addx 2
        noop
        noop
        noop
        addx 8
        noop
        addx -1
        addx 2
        addx 1
        noop
        addx 17
        addx -9
        addx 1
        addx 1
        addx -3
        addx 11
        noop
        noop
        addx 1
        noop
        addx 1
        noop
        noop
        addx -13
        addx -19
        addx 1
        addx 3
        addx 26
        addx -30
        addx 12
        addx -1
        addx 3
        addx 1
        noop
        noop
        noop
        addx -9
        addx 18
        addx 1
        addx 2
        noop
        noop
        addx 9
        noop
        noop
        noop
        addx -1
        addx 2
        addx -37
        addx 1
        addx 3
        noop
        addx 15
        addx -21
        addx 22
        addx -6
        addx 1
        noop
        addx 2
        addx 1
        noop
        addx -10
        noop
        noop
        addx 20
        addx 1
        addx 2
        addx 2
        addx -6
        addx -11
        noop
        noop
        noop`,
        expected: 13140,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        addx 15
        addx -11
        addx 6
        addx -3
        addx 5
        addx -1
        addx -8
        addx 13
        addx 4
        noop
        addx -1
        addx 5
        addx -1
        addx 5
        addx -1
        addx 5
        addx -1
        addx 5
        addx -1
        addx -35
        addx 1
        addx 24
        addx -19
        addx 1
        addx 16
        addx -11
        noop
        noop
        addx 21
        addx -15
        noop
        noop
        addx -3
        addx 9
        addx 1
        addx -3
        addx 8
        addx 1
        addx 5
        noop
        noop
        noop
        noop
        noop
        addx -36
        noop
        addx 1
        addx 7
        noop
        noop
        noop
        addx 2
        addx 6
        noop
        noop
        noop
        noop
        noop
        addx 1
        noop
        noop
        addx 7
        addx 1
        noop
        addx -13
        addx 13
        addx 7
        noop
        addx 1
        addx -33
        noop
        noop
        noop
        addx 2
        noop
        noop
        noop
        addx 8
        noop
        addx -1
        addx 2
        addx 1
        noop
        addx 17
        addx -9
        addx 1
        addx 1
        addx -3
        addx 11
        noop
        noop
        addx 1
        noop
        addx 1
        noop
        noop
        addx -13
        addx -19
        addx 1
        addx 3
        addx 26
        addx -30
        addx 12
        addx -1
        addx 3
        addx 1
        noop
        noop
        noop
        addx -9
        addx 18
        addx 1
        addx 2
        noop
        noop
        addx 9
        noop
        noop
        noop
        addx -1
        addx 2
        addx -37
        addx 1
        addx 3
        noop
        addx 15
        addx -21
        addx 22
        addx -6
        addx 1
        noop
        addx 2
        addx 1
        noop
        addx -10
        noop
        noop
        addx 20
        addx 1
        addx 2
        addx 2
        addx -6
        addx -11
        noop
        noop
        noop`,
        expected: 13140,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
