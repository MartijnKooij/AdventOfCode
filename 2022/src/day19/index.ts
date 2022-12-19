import run from 'aocrunner';

type resource = 'ore' | 'clay' | 'obsidian' | 'geode';
type cost = Record<resource, number>;
type blueprint = Record<resource, cost>;

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

const bfs = (oreCost: cost, clayCost: cost, obsidianCost: cost, geodeCost: cost, timeLeft: number): number => {
  let quality = 0;
  const visited = new Set();

  const stack = [[0, 0, 0, 0, 1, 0, 0, 0, timeLeft]];
  while (stack.length) {
    const current = stack.pop()!;
    let [oreCount, clayCount, obsidianCount, geodeCount, oreRobots, clayRobots, obsidianRobots, geodeRobots, timeLeft] = current;

    quality = Math.max(quality, geodeCount);

    if (timeLeft <= 0) continue;

    const maxOreCost = Math.max(oreCost.ore, clayCost.ore, obsidianCost.ore, geodeCost.ore);
    oreRobots = Math.min(oreRobots, maxOreCost);
    oreCount = Math.min(oreCount, timeLeft * maxOreCost - oreRobots * (timeLeft - 1));

    clayRobots = Math.min(clayRobots, obsidianCost.clay);
    clayCount = Math.min(clayCount, timeLeft * obsidianCost.clay - clayRobots * (timeLeft - 1));

    geodeRobots = Math.min(geodeRobots, geodeCost.obsidian);
    obsidianCount = Math.min(obsidianCount, timeLeft * geodeCost.obsidian - geodeRobots * (timeLeft - 1));

    const visitedKey = `${oreCount}-${clayCount}-${obsidianCount}-${geodeCount}-${oreRobots}-${clayRobots}-${obsidianRobots}-${geodeRobots}-${timeLeft}`;
    if (visited.has(visitedKey)) continue;
    visited.add(visitedKey);

    const newTimeLeft = timeLeft - 1;
    const newOreCount = oreCount + oreRobots;
    const newClayCount = clayCount + clayRobots;
    const newObsidianCount = obsidianCount + obsidianRobots;
    const newGeodeCount = geodeCount + geodeRobots;

    stack.push([newOreCount, newClayCount, newObsidianCount, newGeodeCount, oreRobots, clayRobots, obsidianRobots, geodeRobots, newTimeLeft]);

    if (oreCount >= geodeCost.ore && obsidianCount >= geodeCost.obsidian) {
      // Buy a geode robot
      stack.push([newOreCount - geodeCost.ore, newClayCount, newObsidianCount - geodeCost.obsidian, newGeodeCount, oreRobots, clayRobots, obsidianRobots, geodeRobots + 1, newTimeLeft]);
    }
    if (oreCount >= obsidianCost.ore && clayCount >= obsidianCost.clay) {
      // Buy an obsidian robot
      stack.push([newOreCount - obsidianCost.ore, newClayCount - obsidianCost.clay, newObsidianCount, newGeodeCount, oreRobots, clayRobots, obsidianRobots + 1, geodeRobots, newTimeLeft]);
    }
    if (oreCount >= clayCost.ore) {
      // Buy a clay robot
      stack.push([newOreCount - clayCost.ore, newClayCount, newObsidianCount, newGeodeCount, oreRobots, clayRobots + 1, obsidianRobots, geodeRobots, newTimeLeft]);
    }
    if (oreCount >= oreCost.ore) {
      // Buy another ore robot
      stack.push([newOreCount - oreCost.ore, newClayCount, newObsidianCount, newGeodeCount, oreRobots + 1, clayRobots, obsidianRobots, geodeRobots, newTimeLeft]);
    }

  }

  return quality;
}

const part1 = (rawInput: string) => {
  const blueprints = parseInput(rawInput);

  return blueprints.map((b, i) => (i + 1) * bfs(b.ore, b.clay, b.obsidian, b.geode, 24)).reduce((p, c) => p + c, 0);
};

const part2 = (rawInput: string) => {
  const blueprints = parseInput(rawInput);

  return blueprints
    .slice(0, 3)
    .reduce((p, b) => p * bfs(b.ore, b.clay, b.obsidian, b.geode, 32), 1);
};

run({
  part1: {
    tests: [
      //       {
      //         input: `
      // Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.
      // Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian.`
      //         ,
      //         expected: 33,
      //       },
    ],
    solution: part1,
  },
  part2: {
    tests: [
//       {
//         input: `
// Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.
// Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian.`
//         ,
//         expected: 3472,
//       },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
