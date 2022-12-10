import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");
type point = { x: number; y: number };

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const uniquePoints = new Set();
  let headLocation: point = { x: 0, y: 0 };
  let tailLocation: point = { x: 0, y: 0 };
  uniquePoints.add(JSON.stringify(tailLocation));

  input.forEach((motions) => {
    const direction = motions.split(" ")[0];
    const movements = parseInt(motions.split(" ")[1], 10);

    for (let m = 0; m < movements; m++) {
      headLocation = moveHead(headLocation, direction);
      const distance = Math.floor(Math.sqrt(
        Math.pow(tailLocation.x - headLocation.x, 2) +
        Math.pow(tailLocation.y - headLocation.y, 2)
      ));

      if (distance > 1) {
        tailLocation = moveTail(tailLocation, headLocation);
        uniquePoints.add(JSON.stringify(tailLocation));
      }
    }
  });

  return uniquePoints.size;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const uniquePoints = new Set();
  let headLocation: point = { x: 0, y: 0 };
  let tailLocations: point[] = [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }];
  uniquePoints.add(JSON.stringify(tailLocations[8]));

  input.forEach((motions) => {
    const direction = motions.split(" ")[0];
    const movements = parseInt(motions.split(" ")[1], 10);

    for (let m = 0; m < movements; m++) {
      headLocation = moveHead(headLocation, direction);

      for (let t = 0; t < tailLocations.length; t++) {
        const chasingLocation = t === 0 ? headLocation : tailLocations[t - 1];
        const distance = Math.floor(Math.sqrt(
          Math.pow(tailLocations[t].x - chasingLocation.x, 2) +
          Math.pow(tailLocations[t].y - chasingLocation.y, 2)
        ));

        if (distance > 1) {
          tailLocations[t] = moveTail(tailLocations[t], chasingLocation);

          if (t === tailLocations.length - 1) {
            uniquePoints.add(JSON.stringify(tailLocations[t]));
          }
        }
      }
    }
  });

  return uniquePoints.size;
};

const moveHead = (head: point, direction: string): point => {
  switch (direction) {
    case "L":
      return { x: head.x - 1, y: head.y };
    case "R":
      return { x: head.x + 1, y: head.y };
    case "U":
      return { x: head.x, y: head.y + 1 };
    case "D":
      return { x: head.x, y: head.y - 1 };
    default:
      return head;
  }
};

const moveTail = (tail: point, head: point): point => {
  if (head.x > tail.x) {
    tail.x += 1;
  } else if (head.x < tail.x) {
    tail.x -= 1;
  }

  if (head.y > tail.y) {
    tail.y += 1;
  } else if (head.y < tail.y) {
    tail.y -= 1;
  }

  return tail;
};

run({
  part1: {
    tests: [
      {
        input: `
        R 4
        U 4
        L 3
        D 1
        R 4
        D 1
        L 5
        R 2`,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        R 5
        U 8
        L 8
        D 3
        R 17
        D 10
        L 25
        U 20`,
        expected: 36,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
