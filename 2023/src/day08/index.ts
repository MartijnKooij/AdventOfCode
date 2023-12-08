import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split('\n\n');

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const instructions = input[0].split('');
  const map = stringToMap(input[1]);

  // console.log('data', instructions, map);

  let i = 0;
  let location = map.get('AAA')!;
  while (true) {
    const instruction = instructions[i % instructions.length];
    i++;

    const nextLocation = location.get(instruction)!;
    if (nextLocation === 'ZZZ') {
      break;
    }
    location = map.get(nextLocation)!;

    if (i > 100000) {
      break; //Emergency break...
    }
  }

  return i;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const instructions = input[0].split('');
  const map = stringToMap(input[1]);

  // console.log('data', instructions, map);

  let i = 0;
  let startLocations = Array.from(map.keys()).filter(key => key.endsWith('A'));
  // console.log('start', startLocations);

  const pathLengths = [];
  for (let l = 0; l < startLocations.length; l++) {
    pathLengths.push(getLength(map, instructions, startLocations[l]));
  }

  console.log('lengths', pathLengths);

  const output = lcmArray(pathLengths);

  console.log('output', output);

  return output;
};

function getLength(map: Map<string, Map<string, string>>, instructions: string[], startKey: string): number {
  let i = 0;
  let location = map.get(startKey)!;
  while (true) {
    const instruction = instructions[i % instructions.length];
    i++;

    const nextLocation = location.get(instruction)!;
    if (nextLocation.endsWith('Z')) {
      break;
    }
    location = map.get(nextLocation)!;

    if (i > 100000) {
      break; //Emergency break...
    }
  }

  return i;
}

function gcd(a: number, b: number): number {
  while (b !== 0) {
      let t = b;
      b = a % b;
      a = t;
  }
  return a;
}

function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b);
}

function lcmArray(numbers: number[]): number {
  let result = numbers[0];
  for(let i = 1; i < numbers.length; i++) {
      result = lcm(result, numbers[i]);
  }
  return result;
}

function stringToMap(input: string): Map<string, Map<string, string>> {
  const map = new Map<string, Map<string, string>>();
  const lines = input.split('\n');
  for (const line of lines) {
      const [key, values] = line.split(' = ');
      const [L, R] = values.replace('(', '').replace(')', '').split(', ');
      const innerMap = new Map<string, string>();
      innerMap.set('L', L);
      innerMap.set('R', R);
      map.set(key, innerMap);
  }
  return map;
}

run({
  part1: {
    tests: [
      {
        input: `
        LLR

        AAA = (BBB, BBB)
        BBB = (AAA, ZZZ)
        ZZZ = (ZZZ, ZZZ)`,
        expected: 6,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        LR

        11A = (11B, XXX)
        11B = (XXX, 11Z)
        11Z = (11B, XXX)
        22A = (22B, XXX)
        22B = (22C, 22C)
        22C = (22Z, 22Z)
        22Z = (22B, 22B)
        XXX = (XXX, XXX)`,
        expected: 6,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
