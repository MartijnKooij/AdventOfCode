import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput.split('\n').map((line) => line.split(''));

const directions = [
  [0, 1],  // right
  [1, 0],  // down
  [1, 1],  // down-right
  [1, -1], // down-left
  [0, -1], // left
  [-1, 0], // up
  [-1, -1],// up-left
  [-1, 1]  // up-right
];

const isValid = (matrix: string[][], row: number, col: number) => {
  return row >= 0 && row < matrix.length && col >= 0 && col < matrix[0].length;
};

const searchInDirection = (matrix: string[][], word: string, row: number, col: number, dir: number[]) => {
  for (let i = 0; i < word.length; i++) {
    const newRow = row + i * dir[0];
    const newCol = col + i * dir[1];
    if (!isValid(matrix, newRow, newCol) || matrix[newRow][newCol] !== word[i]) {
      return false;
    }
  }
  return true;
};

const part1 = (rawInput: string) => {
  const matrix = parseInput(rawInput);
  const word = 'XMAS';
  let count = 0;

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[0].length; col++) {
      if (matrix[row][col] === word[0]) {
        for (const dir of directions) {
          if (searchInDirection(matrix, word, row, col, dir)) {
            count++;
          }
        }
      }
    }
  }

  return count;
};

const part2 = (rawInput: string) => {
  const matrix = parseInput(rawInput);
  let count = 0;
  for (let row = 0; row < matrix.length - 2; row++) {
    for (let col = 0; col < matrix[0].length - 2; col++) {
      if ((matrix[row][col] === 'M' && matrix[row][col + 2] === 'S') ||
        (matrix[row][col] === 'S' && matrix[row][col + 2] === 'M')) {
        if (matrix[row + 1][col + 1] === 'A') {
          if ((matrix[row + 2][col] === 'M' && matrix[row + 2][col + 2] === 'S') ||
            (matrix[row + 2][col] === 'S' && matrix[row + 2][col + 2] === 'M')) {
            count++;
          }
        }
      }
    }
  }

  return count;
};

run({
  part1: {
    tests: [
      {
        input: `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX
`,
        expected: 18,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX
`,
        expected: 9,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
