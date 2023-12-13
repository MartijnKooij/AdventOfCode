import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput.split('\n\n').map(input => {
  const rows = input.split('\n').filter((row) => row.length > 0);
  const columns = rows[0].split('').map((_, i) => rows.map((row) => row[i]).join(''));

  return {
    rows,
    columns
  };
});

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let total = 0;
  for (let m = 0; m < input.length; m++) {
    const map = input[m];
    let mapTotal = 0;
    for (let r = 0; r < map.rows.length - 1; r++) {
      if (map.rows[r] === map.rows[r + 1]) {
        if (isReflection(r, map.rows)) {
          console.log('horizontal', r + 1);
          mapTotal += 100 * (r + 1);
          break;
        }
      }
    }

    for (let c = 0; c < map.columns.length - 1; c++) {
      if (map.columns[c] === map.columns[c + 1]) {
        if (isReflection(c, map.columns)) {
          console.log('vertical', c + 1);
          mapTotal += c + 1;
          break;
        }
      }
    }

    total += mapTotal;
    // console.log(mapTotal);
  }

  return total;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let total = 0;
  for (let m = 0; m < input.length; m++) {
    const map = input[m];
    let mapTotal = 0;
    for (let r = 0; r < map.rows.length - 1; r++) {
      if (isReflectionWithSmudges(r, map.rows)) {
        console.log('horizontal', r + 1);
        mapTotal += 100 * (r + 1);
        break;
      }

    }

    for (let c = 0; c < map.columns.length - 1; c++) {
      if (isReflectionWithSmudges(c, map.columns)) {
        console.log('vertical', c + 1);
        mapTotal += c + 1;
        break;

      }
    }

    total += mapTotal;
    // console.log(mapTotal);
  }

  return total;
};

function isReflection(index: number, data: string[], step: number = 1): boolean {
  if (index - step < 0 || index + 1 + step >= data.length) {
    return true;
  }
  if (data[index - step] === data[index + 1 + step]) {
    return isReflection(index, data, step + 1);
  }

  return false;
}

function isReflectionWithSmudges(index: number, data: string[], step: number = 0, smudgeCount: number = 0): boolean {
  if (index - step < 0 || index + 1 + step >= data.length) {
    return smudgeCount === 1;
  }
  const diffs = diffCount(data[index - step], data[index + 1 + step]);
  if (diffs <= 1 && smudgeCount <= 1) {
    return isReflectionWithSmudges(index, data, step + 1, smudgeCount + diffs);
  }

  return false;
}

function diffCount(s1: string, s2: string): number {
  if (s1.length !== s2.length) {
    return 500;
  }
  let diffCount = 0;
  for (let i = 0; i < s1.length; i++) {
    if (s1[i] !== s2[i]) {
      diffCount++;
      if (diffCount > 1) {
        return diffCount;
      }
    }
  }
  return diffCount;
}

run({
  part1: {
    tests: [
      {
        input: `
        #.##..##.
        ..#.##.#.
        ##......#
        ##......#
        ..#.##.#.
        ..##..##.
        #.#.##.#.
        
        #...##..#
        #....#..#
        ..##..###
        #####.##.
        #####.##.
        ..##..###
        #....#..#`,
        expected: 405,
      }
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        #.##..##.
        ..#.##.#.
        ##......#
        ##......#
        ..#.##.#.
        ..##..##.
        #.#.##.#.
        
        #...##..#
        #....#..#
        ..##..###
        #####.##.
        #####.##.
        ..##..###
        #....#..#`,
        expected: 400,
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
