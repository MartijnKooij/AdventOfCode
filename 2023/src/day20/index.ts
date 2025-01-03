import run from 'aocrunner';

type State = 'low' | 'high' | '';
type Node = { id: string; type: string, state: State, targets: string[] };
const nodeFunctions: Record<string, (pulse: State, node: Node) => State> = {
  '%': (pulse: State, node: Node): State => {
    if (pulse === 'high') {
      return '';
    }
    node.state = node.state === 'high' ? 'low' : 'high';
    return node.state;
  },
  '&': (pulse: State, node: Node): State => {
    node.state = pulse;
    return node.state === 'high' ? 'low' : 'high'
  }
};

const parseInput = (rawInput: string) => new Map(rawInput.split('\n').map(l => {
  const p = l.split('->');
  let id = p[0].trim();
  let type = '';
  if (id !== 'broadcaster') {
    type = id.substring(0, 1);
    id = id.substring(1);
  }
  return [id, {
    id,
    type,
    state: 'low',
    targets: p[1].split(',').map(t => t.trim())
  } as Node];
}));

const part1 = (rawInput: string) => {
  const network = parseInput(rawInput);
  console.log(network);

  let lows = 0, highs = 0;
  for (let p = 0; p < 1000; p++) {
    const targets: { target: string; pulse: State }[] = [...network.get('broadcaster')!.targets].map(t => ({ target: t, pulse: 'low' }));
    lows ++; // 1 for the button?

    while (targets.length > 0) {
      const currentTargets = targets.splice(0, targets.length);
      const mappedTargets = currentTargets.map(t => ({ ...t, target: network.get(t.target)! })).filter(t => !!t.target);
      // console.log('processing targets', mappedTargets);
      mappedTargets.forEach((target) => {
        if (target.pulse === 'high') highs++;
        else if (target.pulse === 'low') lows++;

        // console.log('in', target.target.id + target.target.type, target.pulse);
        const newPulse = nodeFunctions[target.target.type](target.pulse, target.target);
        // console.log('out', target.target.id + target.target.type, newPulse, target.target.targets.join(','));

        if (newPulse) {
          targets.push(...target.target.targets.map(t => ({ target: t, pulse: newPulse })));
        }
      });
      if (lows % 100000 === 0 || highs % 100000 === 0) {
        console.log('Still going...', lows, highs);
      }
    }
  }

  console.log('end?', lows, highs);

  return lows * highs;
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
        broadcaster -> a, b, c
        %a -> b
        %b -> c
        %c -> inv
        &inv -> a
        `,
        expected: 32000000,
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
  onlyTests: false,
});
