import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput;

class Command {
  public functions: Map<string, ((val: number) => string | null)> = new Map();
  public parts: Map<string, number> = new Map([['x', 0], ['m', 0], ['a', 0], ['s', 0]]);

  constructor(public defaultCommand: string) { }

  public addParts(p: string, n: number) {
    this.parts.set(p, this.parts.get(p)! + n);
  }
};

const part1 = (rawInput: string) => {
  const [commandsInput, partsInput] = parseInput(rawInput).split('\n\n');
  const commands: Map<string, Command> = new Map();
  commandsInput.split('\n').forEach(cl => { // px{a<2006:qkq,m>2090:A,rfg}
    const cp = cl.replace('{', ',').replace('}', '').split(',');
    if (!commands.has(cp[0])) {
      const newCommand: Command = new Command(cp[cp.length - 1]);
      for (let c = 1; c < cp.length - 1; c++) {
        newCommand.functions.set(cp[c].substring(0, 1), createLambda(cp[c]));
      }
      commands.set(cp[0], newCommand);
    }
  });
  commands.set('A', new Command(''));
  commands.set('R', new Command(''));
  console.log('commands', commands);

  const parts = partsInput.split('\n').map(l => parseParts(l));
  console.log('parts', parts);

  parts.every(part => {
    let c: string | null = 'in';
    // console.log('checking parts at [in]', part);
    while (true) {
      console.log('checking command', c);
      const command = commands.get(c)! as Command;

      let escape = false;
      for (let f of command.functions) {
        const partId = f[0];
        let updateCommand = false;
        c = (command.functions.get(partId)!)(part[partId]);
        if (c) {
          updateCommand = true;
        }
        console.log('new command', c, partId);

        if (c && ['A', 'R'].includes(c)) {
          console.log(`Adding parts to ${c}`, part);
          for (let partId in part) {
            commands.get(c)!.addParts(partId, part[partId]);
          }
          escape = true;
          break;
        } else if (updateCommand) {
          break;
        }
      }
      if (c === null) {
        c = command.defaultCommand;
      }
      if (escape) {
        break
      }
    }
    return true;
  });

  // console.log('test pv', (commands.get('pv')!.functions.get('a')!)(1717)); // pv{a>1716:R,A}

  console.log('Accepted', commands.get('A')?.parts.values());
  console.log('Rejected', commands.get('R')?.parts.values());

  return Array.from(commands.get('A')!.parts.values()).reduce((p, c) => p + c, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

function createLambda(str: string): (val: number) => string | null {
  const [, , comparator, value, result] = str.split(/([a-zA-Z]+)([<>])(\d+):([a-zA-Z]+)/);
  const numValue = parseInt(value);

  console.log('lambda', comparator, value, result);

  if (comparator === '<') {
    return (val: number) => val < numValue ? result : null;
  } else if (comparator === '>') {
    return (val: number) => val > numValue ? result : null;
  } else {
    throw new Error(`Invalid comparator: ${comparator}`);
  }
}

function parseParts(str: string): { [key: string]: number } {
  let obj: { [key: string]: number } = {};
  let entries = str.replace(/[{}]/g, "").split(",");
  for (let entry of entries) {
    let [key, value] = entry.split("=");
    obj[key] = Number(value);
  }
  return obj;
}

run({
  part1: {
    tests: [
      {
        input: `
        px{a<2006:qkq,m>2090:A,rfg}
        pv{a>1716:R,A}
        lnx{m>1548:A,A}
        rfg{s<537:gd,x>2440:R,A}
        qs{s>3448:A,lnx}
        qkq{x<1416:A,crn}
        crn{x>2662:A,R}
        in{s<1351:px,qqz}
        qqz{s>2770:qs,m<1801:hdj,R}
        gd{a>3333:R,R}
        hdj{m>838:A,pv}
        
        {x=787,m=2655,a=1222,s=2876}
        {x=1679,m=44,a=2067,s=496}
        {x=2036,m=264,a=79,s=2244}
        {x=2461,m=1339,a=466,s=291}
        {x=2127,m=1623,a=2188,s=1013}
        `,
        expected: 19114,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
