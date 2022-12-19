import run from 'aocrunner';

type resource = 'ore' | 'clay' | 'obsidian' | 'geode';
type bot = 'ore' | 'clay' | 'obsidian' | 'geode';
type cost = {
  type: resource,
  cost: number
};
type blueprint = {
  id: number,
  bot: bot,
  oreCost: cost,
  clayCost: cost,
  obsidianCost: cost,
  geodeCost: cost,
}
const parseInput = (rawInput: string) => rawInput.split('\n').filter(l => !!l).map((l) => {
  const findBot = /(ore|clay|obsidian|geode)/g;
  const findCost = /(\d+) ([a-z]+)/g;

  const blueprintParts = l.split(':');
  const bluePrintId = parseInt(blueprintParts[0].replace('Blueprint ', ''), 10);

  const botCostParts = blueprintParts[1].split('.');
  console.log('parts', botCostParts.filter(b => !!b).map(b => b.trim()));
  for (const botCostPart of botCostParts.filter(b => !!b).map(b => b.trim())) {
    const botTypeMatch = botCostPart.match(findBot);
    if (botTypeMatch) {
      const oreBotCost = botCostPart.replace(/Each (ore|clay|obsidian|geode) robot costs /g, '');
      console.log('botType', botCostPart, botTypeMatch, oreBotCost);

      const blueprint: blueprint = {
        id: bluePrintId,
        bot: botTypeMatch[0] as bot,
        oreCost: {
          type: 'ore',
          cost: 0
        },
        clayCost: {
          type: 'clay',
          cost: 0
        },
        obsidianCost: {
          type: 'obsidian',
          cost: 0
        },
        geodeCost: {
          type: 'geode',
          cost: 0
        },
      };

      const oreBotMatches = oreBotCost.match(findCost);
      if (oreBotMatches) {
        for (const match of oreBotMatches.filter(m => !!m)) {
          const parts = match.split(' ');
          const value = parseInt(parts[0], 10);
          const type = parts[1] as resource;
          switch (type) {
            case 'clay':
              blueprint.clayCost.cost = value;
              break;
            case 'obsidian':
              blueprint.obsidianCost.cost = value;
              break;
            case 'ore':
              blueprint.oreCost.cost = value;
              break;
            case 'geode':
              blueprint.geodeCost.cost = value;
              break;
            default:
              break;
          }
        }
      }
      return blueprint;
    }
  }
});

const part1 = (rawInput: string) => {
  const blueprints = parseInput(rawInput);
  console.log(blueprints)

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
Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.
Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian.`
        ,
        expected: '',
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
