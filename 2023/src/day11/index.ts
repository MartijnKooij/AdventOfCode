import run from 'aocrunner';
import { Map } from '../utils/map.js';
import { manhattanDistance } from '../utils/functions.js';
import * as fs from 'fs';

const parseInput = (rawInput: string) => new Map(rawInput);
class Galaxy {
  constructor(public title: string, public column: number, public row: number) { }
}

const part1 = (rawInput: string) => {
  const map = parseInput(rawInput);

  const rowsToAdd = [];
  for (let r = 0; r < map.rows; r++) {
    if (map.values[r].every(v => v === '.')) {
      rowsToAdd.push(r);
    }
  }
  rowsToAdd.reverse().forEach(r => map.insertRow(r, '.'));

  const columnsToAdd = [];
  for (let c = 0; c < map.columns; c++) {
    if (map.values.every(v => v[c] === '.')) {
      columnsToAdd.push(c);
    }
  }
  columnsToAdd.reverse().forEach(c => map.insertColumn(c, '.'));

  // console.log('map', map.rows, map.columns);
  fs.writeFileSync('map.txt', map.values.map(m => m.join('')).join('\n'));

  const galaxies: Galaxy[] = [];
  for (let r = 0; r < map.rows; r++) {
    for (let c = 0; c < map.columns; c++) {
      if (map.values[r][c] === '#') {
        galaxies.push(new Galaxy('#', c, r));
      }
    }
  }

  // console.log('galaxies', galaxies);

  const distances = [];
  for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      distances.push(manhattanDistance(galaxies[i].column, galaxies[j].column, galaxies[i].row, galaxies[j].row));
    }
  }

  return distances.reduce((p, c) => p + c, 0);
};

const part2 = (rawInput: string) => {
  const map = parseInput(rawInput);

  const rowsToAdd = [];
  for (let r = 0; r < map.rows; r++) {
    if (map.values[r].every(v => v === '.')) {
      rowsToAdd.push(r);
    }
  }
  // rowsToAdd.reverse().forEach(r => map.insertRows(r, '.', 20));

  const columnsToAdd = [];
  for (let c = 0; c < map.columns; c++) {
    if (map.values.every(v => v[c] === '.')) {
      columnsToAdd.push(c);
    }
  }
  // columnsToAdd.reverse().forEach(c => map.insertColumns(c, '.', 20));

  // console.log('map', map.rows, map.columns);
  fs.writeFileSync('map.txt', map.values.map(m => m.join('')).join('\n'));

  const galaxies: Galaxy[] = [];
  const expand = 1000000;
  for (let r = 0; r < map.rows; r++) {
    for (let c = 0; c < map.columns; c++) {
      if (map.values[r][c] === '#') {
        const newColumns = columnsToAdd.filter(cta => cta < c).length;
        const newRows = rowsToAdd.filter(rta => rta < r).length;
        galaxies.push(new Galaxy('#', c + (newColumns * (expand - 1)), r + (newRows * (expand - 1))));
      }
    }
  }

  // console.log('galaxies', galaxies);

  const distances = [];
  for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      distances.push(manhattanDistance(galaxies[i].column, galaxies[j].column, galaxies[i].row, galaxies[j].row));
    }
  }

  console.log('distances', distances);

  return distances.reduce((p, c) => p + c, 0);
};

run({
  part1: {
    tests: [
      {
        input: `
        ...#......
        .......#..
        #.........
        ..........
        ......#...
        .#........
        .........#
        ..........
        .......#..
        #...#.....
        `,
        expected: 374,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        ...#......
        .......#..
        #.........
        ..........
        ......#...
        .#........
        .........#
        ..........
        .......#..
        #...#.....
        `,
        expected: 8410,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
