import run from 'aocrunner';

class model {
  p1 = 0;
  p2 = 0;
  score = 0;
}

const parseInputPart1 = (rawInput: string): model[] => {
  const lines = rawInput.split('\n');
  const tokenToValue = (token: string): number => {
    switch (token) {
      case 'A':
      case 'X':
        return 1;
      case 'B':
      case 'Y':
        return 2;
      case 'C':
      case 'Z':
        return 3;
      default:
        throw new Error('Invalid token: ' + token);
    }
  }

  const score = (p1: number, p2: number): number => {
    if (p1 === p2) return 3 + p2;

    if ((p2 === 1 && p1 === 3) || (p2 === 2 && p1 === 1) || (p2 === 3 && p1 === 2)) return 6 + p2;

    return 0 + p2;
  }

  return lines.map((line) => {
    const p1 = tokenToValue(line.substring(0, 1));
    const p2 = tokenToValue(line.substring(2, 3));
    return {
      p1,
      p2,
      score: score(p1, p2)
    }
  });
};

const parseInputPart2 = (rawInput: string): model[] => {
  const lines = rawInput.split('\n');
  const tokenToValue = (token: string): number => {
    switch (token) {
      case 'A':
      case 'X':
        return 1;
      case 'B':
      case 'Y':
        return 2;
      case 'C':
      case 'Z':
        return 3;
      default:
        throw new Error('Invalid token: ' + token);
    }
  }

  const score = (p1: number, p2: number): number => {
    if (p1 === p2) return 3 + p2;

    if ((p2 === 1 && p1 === 3) || (p2 === 2 && p1 === 1) || (p2 === 3 && p1 === 2)) return 6 + p2;

    return 0 + p2;
  }

  return lines.map((line) => {
    const p1 = tokenToValue(line.substring(0, 1));
    const goal = line.substring(2, 3);
    let newP2 = '';
    switch (goal) {
      case 'X': // lose
        newP2 = p1 === 1 ? 'Z' : p1 === 2 ? 'X' : 'Y';
        break;
      case 'Z': // win
        newP2 = p1 === 1 ? 'Y' : p1 === 2 ? 'Z' : 'X';
        break;
      case 'Y': // draw
        newP2 = line.substring(0, 1);
        break;
      default:
        break;
    }
    const p2 = tokenToValue(newP2);
    return {
      p1,
      p2,
      score: score(p1, p2)
    }
  });
};

const part1 = (rawInput: string) => {
  const input = parseInputPart1(rawInput);

  return input.reduce(((p, c) => p + c.score), 0);
};

const part2 = (rawInput: string) => {
  const input = parseInputPart2(rawInput);

  return input.reduce(((p, c) => p + c.score), 0);
};

run({
  part1: {
    tests: [
      {
        input: `
        A Y
        B X
        C Z`,
        expected: 15,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        A Y
        B X
        C Z`,
        expected: 12,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
