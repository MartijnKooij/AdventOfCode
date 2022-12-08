import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((l) => l.split("").map((c) => parseInt(c, 10)));

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let score = 0;

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      const tree = input[y][x];
      // console.log(`${x},${y}: ${tree}`, `${isLeftFree(tree, y, x, input)} || ${isRightFree(tree, y, x, input)} || ${isTopFree(tree, y, x, input)} || ${isBottomFree(tree, y, x, input)}`);
      if (
        isLeftFree(tree, y, x, input) ||
        isRightFree(tree, y, x, input) ||
        isTopFree(tree, y, x, input) ||
        isBottomFree(tree, y, x, input)
      ) {
        score++;
        // console.log('score', score);
      }
    }
  }

  return score;
};

const isLeftFree = (
  tree: number,
  treeY: number,
  treeX: number,
  trees: number[][]
): boolean => {
  for (let x = 0; x < treeX; x++) {
    if (trees[treeY][x] >= tree) {
      return false;
    }
  }

  return true;
};

const isRightFree = (
  tree: number,
  treeY: number,
  treeX: number,
  trees: number[][]
): boolean => {
  for (let x = treeX + 1; x < trees[treeY].length; x++) {
    if (trees[treeY][x] >= tree) {
      return false;
    }
  }

  return true;
};

const isTopFree = (
  tree: number,
  treeY: number,
  treeX: number,
  trees: number[][]
): boolean => {
  for (let y = 0; y < treeY; y++) {
    if (trees[y][treeX] >= tree) {
      return false;
    }
  }

  return true;
};

const isBottomFree = (
  tree: number,
  treeY: number,
  treeX: number,
  trees: number[][]
): boolean => {
  for (let y = treeY + 1; y < trees.length; y++) {
    if (trees[y][treeX] >= tree) {
      return false;
    }
  }

  return true;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let highScore = 0;

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      const tree = input[y][x];
      // console.log(`${x},${y}: ${tree}`, `${leftScore(tree, y, x, input)} || ${rightScore(tree, y, x, input)} || ${topScore(tree, y, x, input)} || ${bottomScore(tree, y, x, input)}`);
      const treeScore = leftScore(tree, y, x, input) * rightScore(tree, y, x, input) * topScore(tree, y, x, input) * bottomScore(tree, y, x, input);
      if (treeScore > highScore) {
        highScore = treeScore;
      }
    }
  }

  return highScore;
};

const leftScore = (
  tree: number,
  treeY: number,
  treeX: number,
  trees: number[][]
): number => {
  let score = 0;
  for (let x = treeX - 1; x >= 0; x--) {
    score++;
    if (trees[treeY][x] >= tree) {
      break;
    }
  }

  return score;
};

const rightScore = (
  tree: number,
  treeY: number,
  treeX: number,
  trees: number[][]
): number => {
  let score = 0;
  for (let x = treeX + 1; x < trees[treeY].length; x++) {
    score++;
    if (trees[treeY][x] >= tree) {
      break;
    }
  }

  return score;
};

const topScore = (
  tree: number,
  treeY: number,
  treeX: number,
  trees: number[][]
): number => {
  let score = 0;
  for (let y = treeY - 1; y >= 0; y--) {
    score++;
    if (trees[y][treeX] >= tree) {
      break;
    }
  }

  return score;
};

const bottomScore = (
  tree: number,
  treeY: number,
  treeX: number,
  trees: number[][]
): number => {
  let score = 0;
  for (let y = treeY + 1; y < trees.length; y++) {
    score++;
    if (trees[y][treeX] >= tree) {
      break;
    }
  }

  return score;
};

run({
  part1: {
    tests: [
      {
        input: `
        30373
        25512
        65332
        33549
        35390`,
        expected: 21,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        30373
        25512
        65332
        33549
        35390`,
        expected: 8,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
