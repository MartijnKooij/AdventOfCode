import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split('\n');

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const times = input[0].substring(5).split(' ').filter(v => !!v).map(Number);
  const distances = input[1].substring(9).split(' ').filter(v => !!v).map(Number);
  const distance = (pressed: number, time: number) => pressed * (time - pressed);

  console.log('data', times, distances);

  const waysToWin = [];
  for (let t = 0; t < times.length; t++) {
    const time = times[t];
    const shortestTimes = [];
    for (let p = 0; p < time; p++) {
      const d = distance(p, time);
      if (d > distances[t]) {
        shortestTimes.push(p);
      }
    }
    waysToWin.push(shortestTimes.length);
  }

  return waysToWin.reduce((p, c) => p * c, 1);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const time = Number(input[0].substring(5).replaceAll(' ', ''));
  const distanceToBeat = Number(input[1].substring(9).replaceAll(' ', ''));
  const distance = (pressed: number, time: number) => pressed * (time - pressed);

  console.log('data', time, distanceToBeat);

  const waysToWin = [];
  const shortestTimes = [];
  for (let p = 0; p < time; p++) {
    const d = distance(p, time);
    if (d > distanceToBeat) {
      shortestTimes.push(p);
    }
  }
  waysToWin.push(shortestTimes.length);

  return waysToWin.reduce((p, c) => p * c, 1);
};

run({
  part1: {
    tests: [
      {
        input: `
        Time:      7  15   30
        Distance:  9  40  200`,
        expected: 288,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        Time:      7  15   30
        Distance:  9  40  200`,
        expected: 71503,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
