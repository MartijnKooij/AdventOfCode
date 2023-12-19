import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput;

class Command {
  public functions: Map<string, ((val: number) => string | null)[]> = new Map();
  public parts: Map<string, number> = new Map([['x', 0], ['m', 0], ['a', 0], ['s', 0]]);

  constructor(public commandId: string, public defaultCommand: string, public data: string) { }

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
      const newCommand: Command = new Command(cp[0], cp[cp.length - 1], cl);
      for (let c = 1; c < cp.length - 1; c++) {
        const functionKey = cp[c].substring(0, 1);
        let partFunctions: ((val: number) => string | null)[] = [];
        const newFunction = createLambda(cp[c]);
        if (newCommand.functions.has(functionKey)) {
          partFunctions = newCommand.functions.get(functionKey)!;
        }
        partFunctions.push(newFunction);
        newCommand.functions.set(functionKey, partFunctions);
      }
      commands.set(cp[0], newCommand);
    }
  });
  commands.set('A', new Command('A', '', ''));
  commands.set('R', new Command('R', '', ''));
  // console.log('commands', commands);

  const parts = partsInput.split('\n').map(l => parseParts(l));
  // console.log('parts', parts);

  parts.every(part => {
    let c: string | null | undefined = 'in';
    // console.log('checking parts at [in]', part);
    while (true) {
      // console.log('checking command', c);
      const command = commands.get(c)! as Command;

      const partIds = Array.from(command.functions.keys());
      for (let partId of partIds) {
        // console.log('getting command', command.commandId, partId, c);
        const partFunctions = command.functions.get(partId)!;
        c = partFunctions[0](part[partId]);
        if (!c && partFunctions.length > 1) {
          c = partFunctions[1](part[partId]);
        }
        if (c) {
          // console.log('new command', command.commandId, partId, c, part[partId], partFunctions);
          break;
        }
        // console.log('no command found', command.commandId, partId, c);
      }
      if (c === null) {
        c = command.defaultCommand;
        // console.log('picking default command', c);
      }
      if (['A', 'R'].includes(c)) {
        // console.log(`Adding parts to ${c}`, part);

        for (let partId in part) {
          commands.get(c)!.addParts(partId, part[partId]);
        }
        break;
      }
    }
    return true;
  });

  // console.log('test dde', (commands.get('dde')!.functions.get('s')![0])(300)); // pv{a>1716:R,A}

  console.log('Accepted', commands.get('A')?.parts.keys(), commands.get('A')?.parts.values());
  // console.log('Rejected', commands.get('R')?.parts.values());

  return Array.from(commands.get('A')!.parts.values()).reduce((p, c) => p + c, 0);
};

const part2 = (rawInput: string) => {
  const [commandsInput, partsInput] = parseInput(rawInput).split('\n\n');
  const commands: Map<string, Command> = new Map();
  commandsInput.split('\n').forEach(cl => { // px{a<2006:qkq,m>2090:A,rfg}
    const cp = cl.replace('{', ',').replace('}', '').split(',');
    if (!commands.has(cp[0])) {
      const newCommand: Command = new Command(cp[0], cp[cp.length - 1], cl);
      for (let c = 1; c < cp.length - 1; c++) {
        const functionKey = cp[c].substring(0, 1);
        let partFunctions: ((val: number) => string | null)[] = [];
        const newFunction = createLambda(cp[c]);
        if (newCommand.functions.has(functionKey)) {
          partFunctions = newCommand.functions.get(functionKey)!;
        }
        partFunctions.push(newFunction);
        newCommand.functions.set(functionKey, partFunctions);
      }
      commands.set(cp[0], newCommand);
    }
  });
  commands.set('A', new Command('A', '', ''));
  commands.set('R', new Command('R', '', ''));
  // console.log('commands', commands);

  const finalCommands = Array.from(commands.entries()).filter(c => c[1].defaultCommand === 'A' || c[1].data.includes(':A')).map(c => c[1].data);
  console.log('final', finalCommands);

  const parts = partsInput.split('\n').map(l => parseParts(l));
  // console.log('parts', parts);

  for (let x = 0; x < 2440; x++) {
    console.log('Still going...', 4000-x);
    for (let m = 0; m < 4000; m++) {
      for (let a = 0; a < 1716; a++) {
        for (let s = 537; s < 4000; s++) {
          const part: { [key: string]: number } = { 'x': x, 'm': m, 'a': a, 's': s };

          let c: string | null | undefined = 'in';
          // console.log('checking parts at [in]', part);
          while (true) {
            // console.log('checking command', c);
            const command = commands.get(c)! as Command;

            const partIds = Array.from(command.functions.keys());
            for (let partId of partIds) {
              // console.log('getting command', command.commandId, partId, c);
              const partFunctions = command.functions.get(partId)!;
              c = partFunctions[0](part[partId]);
              if (!c && partFunctions.length > 1) {
                c = partFunctions[1](part[partId]);
              }
              if (c) {
                // console.log('new command', command.commandId, partId, c, part[partId], partFunctions);
                break;
              }
              // console.log('no command found', command.commandId, partId, c);
            }
            if (c === null) {
              c = command.defaultCommand;
              // console.log('picking default command', c);
            }
            if (['A', 'R'].includes(c)) {
              // console.log(`Adding parts to ${c}`, part);

              for (let partId in part) {
                commands.get(c)!.addParts(partId, part[partId]);
              }
              break;
            }
          }
          break;
        }
      }
    }
  }

  // console.log('test dde', (commands.get('dde')!.functions.get('s')![0])(300)); // pv{a>1716:R,A}

  console.log('Accepted', commands.get('A')?.parts.keys(), commands.get('A')?.parts.values());
  // console.log('Rejected', commands.get('R')?.parts.values());

  return Array.from(commands.get('A')!.parts.values()).reduce((p, c) => p + c, 0);
};

function createLambda(str: string): (val: number) => string | null {
  const [, , comparator, value, result] = str.split(/([a-zA-Z]+)([<>])(\d+):([a-zA-Z]+)/);
  const numValue = Number(value);

  // console.log('lambda', comparator, value, result);

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
        expected: 167409079868000,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
