import run from "aocrunner";

type MapEntry = number[][];
const mapKeys: string[] = ['seeds', 'seed-to-soil map', 'soil-to-fertilizer map', 'fertilizer-to-water map', 'water-to-light map', 'light-to-temperature map', 'temperature-to-humidity map', 'humidity-to-location map'];

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseText(parseInput(rawInput));
  const seeds = input.get('seeds')![0];

  // console.log('data', input, seeds);

  let smallestSeed = Number.MAX_SAFE_INTEGER;
  seeds.forEach(seed => {
    // console.log('searching for seed', seed);
    const found = findPath(input, 1, seed);
    // console.log('found seed', seed, found);
    if (found < smallestSeed) {
      smallestSeed = found;
    }
  });

  return smallestSeed;
};

const part2 = (rawInput: string) => {
  const input = parseText(parseInput(rawInput));
  const seeds = input.get('seeds')![0];

  // console.log('data', input, seeds);

  let smallestSeed = Number.MAX_SAFE_INTEGER;
  for (let s = 0; s < seeds.length - 1; s += 2) {
    const startSeed = seeds[s];
    const seedLength = seeds[s + 1];
    for (let seed = startSeed; seed < startSeed + seedLength; seed++) {
      // console.log('searching for seed', seed);
      const found = findPath(input, 1, seed);
      // console.log('found seed', seed, found);
      if (found < smallestSeed) {
        smallestSeed = found;
        console.log('found smaller seed', smallestSeed);
      }
    }
  }

  return smallestSeed;
};

function findPath(input: Map<string, MapEntry>, keyIndex: number, seed: number) {
  if (mapKeys.length <= keyIndex) {
    return seed;
  }

  let smallestFound = Number.MAX_SAFE_INTEGER;
  const maps = input.get(mapKeys[keyIndex]);
  let found = -1;
  maps?.forEach(map => {
    // console.log('map', mapKeys[keyIndex], map, seed);
    if (map[1] <= seed && map[1] + map[2] >= seed) {
      let newFound = map[0] + (seed - map[1]);
      if (newFound < smallestFound) {
        smallestFound = newFound;
        found = smallestFound;
      }
    }
  });
  if (found === -1) {
    found = seed;
  }
  // console.log('deeper', seed, found);
  return findPath(input, keyIndex + 1, found);
}

function parseText(input: string): Map<string, MapEntry> {
  const result = new Map<string, MapEntry>();
  const lines = input.split('\n');

  let currentKey = '';
  let currentValue: number[][] = [];

  for (const line of lines) {
    if (line.includes(':')) {
      if (currentKey) {
        // Save the previous key-value pair
        result.set(currentKey, currentValue);
      }
      // Start a new key-value pair
      const [key, value] = line.split(':');
      currentKey = key;
      currentValue = value ? [[...value.split(' ').filter(v => !!v).map(Number)]] : [];
    } else if (line.trim() !== '') {
      // Continue the current key-value pair
      currentValue.push(line.split(' ').map(Number));
    }
  }
  // Save the last key-value pair
  if (currentKey) {
    result.set(currentKey, currentValue);
  }

  return result;
}


run({
  part1: {
    tests: [
      {
        input: `
        seeds: 79 14 55 13

        seed-to-soil map:
        50 98 2
        52 50 48
        
        soil-to-fertilizer map:
        0 15 37
        37 52 2
        39 0 15
        
        fertilizer-to-water map:
        49 53 8
        0 11 42
        42 0 7
        57 7 4
        
        water-to-light map:
        88 18 7
        18 25 70
        
        light-to-temperature map:
        45 77 23
        81 45 19
        68 64 13
        
        temperature-to-humidity map:
        0 69 1
        1 0 69
        
        humidity-to-location map:
        60 56 37
        56 93 4`,
        expected: 35,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        seeds: 79 14 55 13

        seed-to-soil map:
        50 98 2
        52 50 48
        
        soil-to-fertilizer map:
        0 15 37
        37 52 2
        39 0 15
        
        fertilizer-to-water map:
        49 53 8
        0 11 42
        42 0 7
        57 7 4
        
        water-to-light map:
        88 18 7
        18 25 70
        
        light-to-temperature map:
        45 77 23
        81 45 19
        68 64 13
        
        temperature-to-humidity map:
        0 69 1
        1 0 69
        
        humidity-to-location map:
        60 56 37
        56 93 4`,
        expected: 46,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
