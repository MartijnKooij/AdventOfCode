import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split('\n');

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const data = input.map(l => {
    const values = l.substring(l.indexOf(':') + 1).split('|');
    return {
      winners: values[0].trim().split(' ').filter(v => !!v).map(Number),
      cards: values[1].trim().split(' ').filter(v => !!v).map(Number)
    };
  });
  const winners = data
    .map(v => v.winners.filter(w => v.cards.includes(w)))
    .filter(w => w.length > 0);

  const points = winners.map(w => double(1, w.length - 1));

  return points.reduce((p, c) => p + c, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const data = input.map(l => {
    const values = l.substring(l.indexOf(':') + 1).split('|');
    return {
      id: l.split(':')[0],
      winners: values[0].trim().split(' ').filter(v => !!v).map(Number),
      cards: values[1].trim().split(' ').filter(v => !!v).map(Number),
      count: 1
    };
  });

  for (let index = 0; index < data.length; index++) {
    const d = data[index];
    const winners = d.winners.filter(w => d.cards.includes(w)).filter(w => w > 0);
    for (let n = index + 1; n < Math.min(data.length, index + 1 + winners.length); n++) {
      data[n].count += (data[index].count);
    }
  }

  // console.log('data', data);

  return data.reduce((p, c) => p + c.count, 0);
};

function double(num: number, n: number): number {
  for (let i = 0; i < n; i++) {
    num *= 2;
  }
  return num;
}

run({
  part1: {
    tests: [
      {
        input: `
        Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
        Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
        Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
        Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
        Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
        Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
        Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
        Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
        Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
        Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
        Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
        expected: 30,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
