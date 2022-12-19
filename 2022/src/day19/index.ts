import run from 'aocrunner';

type resource = 'ore' | 'clay' | 'obsidian' | 'geode';
type cost = {
  type: resource,
  cost: number
};
type bot = {
  resource: resource,
  oreCost: cost,
  clayCost: cost,
  obsidianCost: cost,
  geodeCost: cost
};
class Blueprint {
  id: number;
  oreBot: bot;
  clayBot: bot;
  obsidianBot: bot;
  geodeBot: bot;

  constructor(id: number) {
    this.id = id;
    this.oreBot = { resource: 'ore', oreCost: { type: 'ore', cost: 0 }, clayCost: { type: 'clay', cost: 0 }, obsidianCost: { type: 'obsidian', cost: 0 }, geodeCost: { type: 'geode', cost: 0 } };
    this.clayBot = { resource: 'clay', oreCost: { type: 'ore', cost: 0 }, clayCost: { type: 'clay', cost: 0 }, obsidianCost: { type: 'obsidian', cost: 0 }, geodeCost: { type: 'geode', cost: 0 } };
    this.obsidianBot = { resource: 'obsidian', oreCost: { type: 'ore', cost: 0 }, clayCost: { type: 'clay', cost: 0 }, obsidianCost: { type: 'obsidian', cost: 0 }, geodeCost: { type: 'geode', cost: 0 } };
    this.geodeBot = { resource: 'geode', oreCost: { type: 'ore', cost: 0 }, clayCost: { type: 'clay', cost: 0 }, obsidianCost: { type: 'obsidian', cost: 0 }, geodeCost: { type: 'geode', cost: 0 } };
  }
}
const parseInput = (rawInput: string) => rawInput.split('\n').filter(l => !!l).map((l) => {
  const findBot = /(ore|clay|obsidian|geode)/g;
  const findCost = /(\d+) ([a-z]+)/g;

  const blueprintParts = l.split(':');
  const bluePrintId = parseInt(blueprintParts[0].replace('Blueprint ', ''), 10);
  const blueprint = new Blueprint(bluePrintId);

  const botCostParts = blueprintParts[1].split('.');
  for (const botCostPart of botCostParts.filter(b => !!b).map(b => b.trim())) {
    const botTypeMatch = botCostPart.match(findBot);

    if (botTypeMatch) {
      const botCost = botCostPart.replace(/Each (ore|clay|obsidian|geode) robot costs /g, '');

      let currentBot: bot;
      switch (botTypeMatch[0]) {
        case 'clay':
          currentBot = blueprint.clayBot;
          break;
        case 'obsidian':
          currentBot = blueprint.obsidianBot;
          break;
        case 'ore':
          currentBot = blueprint.oreBot;
          break;
        case 'geode':
          currentBot = blueprint.geodeBot;
          break;
        default:
          throw new Error('unknown bot ' + botTypeMatch);
      }

      const costMatches = botCost.match(findCost);
      if (costMatches) {
        for (const match of costMatches.filter(m => !!m)) {
          const parts = match.split(' ');
          const value = parseInt(parts[0], 10);
          const type = parts[1] as resource;
          switch (type) {
            case 'clay':
              currentBot.clayCost.cost = value;
              break;
            case 'obsidian':
              currentBot.obsidianCost.cost = value;
              break;
            case 'ore':
              currentBot.oreCost.cost = value;
              break;
            case 'geode':
              currentBot.geodeCost.cost = value;
              break;
            default:
              break;
          }
        }
      }
    }
  }
  return blueprint;

});

const part1 = (rawInput: string) => {
  const blueprints = parseInput(rawInput);
  console.log(JSON.stringify(blueprints));

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
