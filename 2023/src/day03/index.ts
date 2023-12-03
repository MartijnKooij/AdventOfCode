import run from "aocrunner";
import * as fs from 'fs';

const parseInput = (rawInput: string) => rawInput.split('\n');

type record = {
  id: string;
  value: string;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const map: record[][] = [];

  for (let y = 0; y < input.length; y++) {
    const row = parseNumbers(input[y], y);
    map[y] = row.map((v, x) => {
      const parts = v.includes(';') ? v.split(';') : [y + ',' + x, v];
      return {
        id: parts[0],
        value: parts[1]
      }
    }
    );
  }

  const allFound = [];
  for (let x = 0; x < input[0].length; x++) {
    for (let y = 0; y < input.length; y++) {
      if ((/[^.\d]/.test(map[y][x].value))) {
        const found = findAdjacentNumbers(map, x, y);
        allFound.push(...found);
      }
    }
  }

  // console.log('allFound', allFound);

  fs.writeFileSync('./log.txt', JSON.stringify(allFound.filter((record, index, self) =>
    index === self.findIndex((r) => r.id === record.id))));

  const sum = allFound
    .filter((record, index, self) =>
      index === self.findIndex((r) => r.id === record.id))
    .map(r => Number(r.value)).reduce((p, c) => p + c, 0);

  // console.log('map', map);
  return sum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const map: record[][] = [];

  for (let y = 0; y < input.length; y++) {
    const row = parseNumbers(input[y], y);
    map[y] = row.map((v, x) => {
      const parts = v.includes(';') ? v.split(';') : [y + ',' + x, v];
      return {
        id: parts[0],
        value: parts[1]
      }
    }
    );
  }

  const allFound = [];
  for (let x = 0; x < input[0].length; x++) {
    for (let y = 0; y < input.length; y++) {
      if (map[y][x].value === '*') {
        const found = findAdjacentNumbers(map, x, y)
          .filter((record, index, self) => index === self.findIndex((r) => r.id === record.id));
        if (found.length === 2) {
          // console.log('found', found);
          allFound.push(Number(found[0].value) * Number(found[1].value));
        }
      }
    }
  }

  // console.log('map', map);

  return allFound.reduce((p, c) => p + c, 0);
};

function findAdjacentNumbers(map: record[][], x: number, y: number) {
  let surroundingValues = [];

  for (let i = Math.max(0, y - 1); i <= Math.min(map.length - 1, y + 1); i++) {
    for (let j = Math.max(0, x - 1); j <= Math.min(map[0].length - 1, x + 1); j++) {
      if (i !== y || j !== x) {
        surroundingValues.push(map[i][j]);
      }
    }
  }

  // if (map[y][x].value === '-') {
  //   console.log('found around -', surroundingValues);
  // }

  return surroundingValues.filter(r => isFinite(parseFloat((r.value))));
}

function parseNumbers(str: string, y: number) {
  let result = str.split('');

  let numbers = str.match(/\d+/g)?.map(Number);
  // console.log('numbers', numbers);
  let x = 0;
  numbers?.forEach(n => {
    const value = n + '';
    x = str.indexOf(value, x);
    for (let i = 0; i < value.length; i++) {
      result[x + i] = y + ',' + x + ';' + value;
    }
    x += value.length;
  });

  return result;
}

run({
  part1: {
    tests: [
      {
        input: `
        467..114..
        ...*......
        ..35..633.
        ......#...
        617*......
        .....+.58.
        ..592.....
        ......755.
        ...$.*....
        .664.598..`,
        expected: 4361,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        467..114..
        ...*......
        ..35..633.
        ......#...
        617*......
        .....+.58.
        ..592.....
        ......755.
        ...$.*....
        .664.598..`,
        expected: 467835,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

