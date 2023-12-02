import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split('\n');

const part1 = (rawInput: string) => {
  // 12 red cubes, 13 green cubes, and 14 blue cubes
  const input = parseInput(rawInput);
  const bags = input.map(l => ({
    id: Number(l.substring(5, l.indexOf(':'))),
    r: l.split(';').map(s => s.includes('red') ? Number(s.split('red')[0].trim().split(' ').pop() || '0') : 0),
    g: l.split(';').map(s => s.includes('green') ? Number(s.split('green')[0].trim().split(' ').pop() || '0') : 0),
    b: l.split(';').map(s => s.includes('blue') ? Number(s.split('blue')[0].trim().split(' ').pop() || '0') : 0)
  }));
  const filteredBags = bags.filter(b => b.r.every(v => v <= 12) && b.g.every(v => v <= 13) && b.b.every(v => v <= 14));

  return filteredBags.reduce((p, c) => p + c.id, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const bags = input.map(l => ({
    id: Number(l.substring(5, l.indexOf(':'))),
    r: Math.max(...l.split(';').map(s => s.includes('red') ? Number(s.split('red')[0].trim().split(' ').pop() || '0') : 0)),
    g: Math.max(...l.split(';').map(s => s.includes('green') ? Number(s.split('green')[0].trim().split(' ').pop() || '0') : 0)),
    b: Math.max(...l.split(';').map(s => s.includes('blue') ? Number(s.split('blue')[0].trim().split(' ').pop() || '0') : 0))
  }));

  return bags.reduce((p, c) => p + (c.r * c.g * c.b), 0);
};

run({
  part1: {
    tests: [
      {
        input: `
        Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
        Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
        Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
        Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
        Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 8,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
        Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
        Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
        Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
        Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 2286,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
