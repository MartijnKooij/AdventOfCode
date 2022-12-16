import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput.split('\n').map((l) => {
  const parts = l.split(';');
  const valve = parts[0].substring(6, 8);
  const valveFlow = parseInt(parts[0].split('=')[1], 10);
  const tunnels = parts[1].replace(' tunnels lead to valves ', '').split(', ');

  return {
    valve,
    valveFlow,
    tunnels
  };
});

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const graph = [];
  input.forEach(node => {
    node.tunnels.forEach(tunnel => {
      graph.push([node.valve, tunnel, node.valveFlow]);
    });
  });

  console.log(graph);

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
        Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
        Valve BB has flow rate=13; tunnels lead to valves CC, AA
        Valve CC has flow rate=2; tunnels lead to valves DD, BB
        Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
        Valve EE has flow rate=3; tunnels lead to valves FF, DD
        Valve FF has flow rate=0; tunnels lead to valves EE, GG
        Valve GG has flow rate=0; tunnels lead to valves FF, HH
        Valve HH has flow rate=22; tunnel leads to valve GG
        Valve II has flow rate=0; tunnels lead to valves AA, JJ
        Valve JJ has flow rate=21; tunnel leads to valve II`,
        expected: 1651,
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
