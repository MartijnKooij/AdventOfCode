import run from 'aocrunner';

type resource = 'ore' | 'clay' | 'obsidian' | 'geode';
const resourceTypes: resource[] = ['ore', 'clay', 'obsidian', 'geode'];

class Bot {
  constructor(public resource: resource, public oreCost: number = 0, public clayCost: number = 0, public obsidianCost: number = 0, public geodeCost: number = 0) {
  }

  canAfford(oreCount: number, clayCount: number, obsidianCount: number, geodeCound: number): boolean {
    return oreCount >= this.oreCost && clayCount >= this.clayCost && obsidianCount >= this.obsidianCost && geodeCound >= this.geodeCost;
  }
};

class Blueprint {
  id: number;
  bots: Map<resource, Bot> = new Map<resource, Bot>();

  constructor(id: number) {
    this.id = id;
    this.bots.set('ore', new Bot('ore'));
    this.bots.set('clay', new Bot('clay'));
    this.bots.set('obsidian', new Bot('obsidian'));
    this.bots.set('geode', new Bot('geode'));
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

      let currentBot = blueprint.bots.get(botTypeMatch[0] as resource);
      if (!currentBot) {
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
              currentBot.clayCost = value;
              break;
            case 'obsidian':
              currentBot.obsidianCost = value;
              break;
            case 'ore':
              currentBot.oreCost = value;
              break;
            case 'geode':
              currentBot.geodeCost = value;
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

  let qualityLevel = 0;
  for (const blueprint of blueprints) {
    let time = 24;
    let oreCount = 0, clayCount = 0, obsidianCount = 0, geodeCount = 0;
    let oreCollection = 1, clayCollection = 0, obsidianCollection = 0, geodeCollection = 0;

    let robotType = 1;
    let nextBot = blueprint.bots.get(resourceTypes[robotType]);
    if (!nextBot) {
      throw new Error('No next bot for type ' + robotType);
    }

    while (time > 0) {
      if (nextBot.resource !== 'geode') {
        const upgradeBot = blueprint.bots.get(resourceTypes[robotType+1]);
        const canBuyNext = upgradeBot?.canAfford(oreCount, clayCount, obsidianCount, geodeCount);
        if (canBuyNext && upgradeBot) {
          nextBot = upgradeBot;
          robotType += 1;
          console.log('upgraded bot to', upgradeBot);
        }
      }

      const canBuyBot = nextBot?.canAfford(oreCount, clayCount, obsidianCount, geodeCount);
      console.log('start', blueprint.id, 24-time+1, oreCount, clayCount, obsidianCount, geodeCount, canBuyBot);

      if (canBuyBot) {
        oreCount -= nextBot.oreCost;
        clayCount -= nextBot.clayCost;
        obsidianCount -= nextBot.obsidianCost;
        geodeCount -= nextBot.geodeCost;

        console.log(`buying a [${nextBot.resource}] bot`, blueprint.id, 24-time+1, oreCount, clayCount, obsidianCount, geodeCount);
      }

      oreCount += oreCollection;
      clayCount += clayCollection;
      obsidianCount += obsidianCollection;
      geodeCount += geodeCollection;

      if (canBuyBot) {
        switch (nextBot.resource) {
          case 'clay':
            clayCollection += 1;
            break;
          case 'ore':
            oreCollection += 1;
            break;
          case 'obsidian':
            obsidianCollection += 1;
            break;
          case 'geode':
            geodeCollection += 1;
            break;
          default:
            break;
        }

        console.log('incrementing collection', oreCollection, clayCollection, obsidianCollection, geodeCollection)
      }

      console.log('end  ', blueprint.id, 24-time+1, oreCount, clayCount, obsidianCount, geodeCount, canBuyBot);

      time--;
    }
    qualityLevel += blueprint.id * geodeCount;
  }


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
