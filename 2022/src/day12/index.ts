import run from "aocrunner";
import { astar } from "pathfinding-algorithms";

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((l) =>
    l.split("").map((c) => {
      return {
        weight: c.charCodeAt(0) - 97,
        isWall: false
      };
    })
  );

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  input[0][0].weight = "a".charCodeAt(0) - 97;
  const startPos = { x: 0, y: 0 };
  let goalPos = { x: 0, y: 0 };
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x].weight === "E".charCodeAt(0) - 97) {
        input[y][x].weight = "z".charCodeAt(0) - 97;
        goalPos = { x, y };
      }
    }
  }

  const pathfinding = new astar(
    `${startPos.x}_${startPos.y}`,
    `${goalPos.x}_${goalPos.y}`,
    input
  );
  console.log(pathfinding);
  let { exploredNodes, path } = pathfinding.startAlgorithm();
  console.log(input, startPos, goalPos, path);

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
        Sabqponm
        abcryxxl
        accszExk
        acctuvwj
        abdefghi`,
        expected: 31,
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
