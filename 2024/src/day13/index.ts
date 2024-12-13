import run from 'aocrunner';

const parseInput = (rawInput: string) => {
  return rawInput
    .trim()
    .split('\n\n')
    .map((line) => {
      const [buttonALine, buttonBLine, prizeLine] = line.split('\n');

      const parsePosition = (position: string) => {
        const [xPart, yPart] = position.split(', ');
        const x = parseInt(xPart.split(/[+=]/)[1]);
        const y = parseInt(yPart.split(/[+=]/)[1]);
        return { x, y };
      };

      const buttonAPosition = parsePosition(buttonALine.split(': ')[1]);
      const buttonBPosition = parsePosition(buttonBLine.split(': ')[1]);
      const prizePosition = parsePosition(prizeLine.split(': ')[1]);

      return {
        buttonA: buttonAPosition,
        buttonB: buttonBPosition,
        prize: prizePosition,
      };
    });
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  for (const { buttonA, buttonB, prize } of input) {
    let tX = 0;
    let tY = 0;
    for (let aPresses = 0; aPresses < 100; aPresses++) {
      for (let bPresses = 0; bPresses < 100; bPresses++) {
      }
    }
  }

  return;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279
`,
        expected: 480,
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
  onlyTests: true,
});
