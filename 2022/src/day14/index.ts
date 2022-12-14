import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput
  .split('\n').map(l => l
    .split(' -> ').map((p) => {
      const point = p.split(',');
      return {
        x: parseInt(point[0], 10),
        y: parseInt(point[1], 10)
      };
    }));

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const map = [];
  for (let y = 0; y < 1000; y++) {
    map.push(''.padEnd(1000, '.').split(''));
  }

  for (const line of input) {
    for (let p = 0; p < line.length - 1; p++) {
      const p1 = line[p];
      const p2 = line[p + 1];
      const xDiff = Math.abs(p1.x - p2.x);
      const xStart = Math.min(p1.x, p2.x);
      const yDiff = Math.abs(p1.y - p2.y);
      const yStart = Math.min(p1.y, p2.y);

      if (xDiff > 0) {
        for (let x = xStart; x <= xStart + xDiff; x++) {
          map[yStart][x] = '#';
        }

      }
      if (yDiff > 0) {
        for (let y = yStart; y <= yStart + yDiff; y++) {
          map[y][xStart] = '#';
        }
      }
    }
  }

  console.log(input, map.map(row => row.join('')).join('\n'));

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
        input: `
        498,4 -> 498,6 -> 496,6
        503,4 -> 502,4 -> 502,9 -> 494,9`,
        expected: 24,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: '',
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
