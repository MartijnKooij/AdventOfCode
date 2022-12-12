import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((l) => l.split("").map((c) => {
    if (c === 'S') return 0;
    if (c === 'E') return 27;
    return c.charCodeAt(0) - 96;
  }));

class node {
  x: number = 0;
  y: number = 0;
  level: number = 0;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let start = { x: 0, y: 0 };
  let end = { x: 0, y: 0 };
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x] === 0) start = { x, y };
      if (input[y][x] === 27) end = { x, y };
    }
  }

  const queue: node[] = [
    {
      x: start.x,
      y: start.y,
      level: 0,
    },
  ];

  let final: undefined | node = undefined;
  const visited: Set<string> = new Set();

  while (queue.length > 0) {
    const position = queue.shift()!;
    const key = `${position.x}_${position.y}`;

    if (visited.has(key)) {
      continue;
    }

    visited.add(key);

    if (position.x === end.x && position.y === end.y) {
      final = position;
      break;
    }

    const currentHeight = input[position.y][position.x];

    if (position.y > 0 && input[position.y - 1][position.x] - currentHeight <= 1) {
      queue.push({
        x: position.x,
        y: position.y - 1,
        level: position.level + 1,
      });
    }

    if (position.y < input.length - 1 && input[position.y + 1][position.x] - currentHeight <= 1) {
      queue.push({
        x: position.x,
        y: position.y + 1,
        level: position.level + 1,
      });
    }

    if (position.x > 0 && input[position.y][position.x - 1] - currentHeight <= 1) {
      queue.push({
        x: position.x - 1,
        y: position.y,
        level: position.level + 1,
      });
    }

    if (position.x < input[0].length - 1 && input[position.y][position.x + 1] - currentHeight <= 1) {
      queue.push({
        x: position.x + 1,
        y: position.y,
        level: position.level + 1,
      });
    }
  }

  return final?.level;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let end = { x: 0, y: 0 };
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x] === 0) {
        input[y][x] = 1;
      };
      if (input[y][x] === 27) end = { x, y };
    }
  }

  const queue: node[] = [
    {
      x: end.x,
      y: end.y,
      level: 0,
    },
  ];

  let final: undefined | node = undefined;
  const visited: Set<string> = new Set();

  while (queue.length > 0) {
    const position = queue.shift()!;
    const key = `${position.x},${position.y}`;
  
    if (visited.has(key)) {
      continue;
    }
  
    visited.add(key);
  
    if (input[position.y][position.x] === 1) {
      final = position;
      break;
    }
  
    const currentHeight = input[position.y][position.x];
  
    if (position.y > 0 && currentHeight - input[position.y - 1][position.x] <= 1) {
      queue.push({
        x: position.x,
        y: position.y - 1,
        level: position.level + 1,
      });
    }
  
    if (position.y < input.length - 1 && currentHeight - input[position.y + 1][position.x] <= 1) {
      queue.push({
        x: position.x,
        y: position.y + 1,
        level: position.level + 1,
      });
    }
  
    if (position.x > 0 && currentHeight - input[position.y][position.x - 1] <= 1) {
      queue.push({
        x: position.x - 1,
        y: position.y,
        level: position.level + 1,
      });
    }
  
    if (position.x < input[0].length - 1 && currentHeight - input[position.y][position.x + 1] <= 1) {
      queue.push({
        x: position.x + 1,
        y: position.y,
        level: position.level + 1,
      });
    }
  }
  
  return final?.level;
  };

run({
  part1: {
    tests: [
      {
        // v..v<<<<
        // >v.vv<<^
        // .>vv>E^^
        // ..v>>>^^
        // ..>>>>>^
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
      {
        input: `
        Sabqponm
        abcryxxl
        accszExk
        acctuvwj
        abdefghi`,
        expected: 29,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
