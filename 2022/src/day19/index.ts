import run from 'aocrunner';

type resource = 'ore' | 'clay' | 'obsidian' | 'geode';
type botRequirement = Record<resource, number>;
type blueprint = Record<resource, botRequirement>;

const parseInput = (rawInput: string): blueprint[] => rawInput.split('\n').filter(l => !!l).map((l) => {
  // Get all numbers from e.g.
  // Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.
  const allNumbers = l.match(/(\d+)/g)?.map(m => Number(m));
  if (!allNumbers) throw new Error('Input error...');

  const blueprint = {
    'ore': {
      'ore': allNumbers[1],
      'clay': 0,
      'obsidian': 0,
      'geode': 0
    },
    'clay': {
      'ore': allNumbers[2],
      'clay': 0,
      'obsidian': 0,
      'geode': 0
    },
    'obsidian': {
      'ore': allNumbers[3],
      'clay': allNumbers[4],
      'obsidian': 0,
      'geode': 0
    },
    'geode': {
      'ore': allNumbers[5],
      'clay': 0,
      'obsidian': allNumbers[6],
      'geode': 0
    }
  }

  return blueprint;
});

const part1 = (rawInput: string) => {
  const blueprints = parseInput(rawInput);
  console.log(blueprints);

  let qualityLevel = 0;

  return qualityLevel;
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
Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.
Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian.`
        ,
        expected: 33,
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
