import run from 'aocrunner';

type Hailstone = { px: number, py: number, pz: number, vx: number, vy: number, vz: number };
const parseInput = (rawInput: string) => rawInput.split('\n').filter(l => !!l).map(l => {
  const parts = l.split('@');
  const [px, py, pz] = parts[0].split(', ').map(Number);
  const [vx, vy, vz] = parts[1].split(', ').map(Number);
  return {
    px, py, pz,
    vx, vy, vz
  } as Hailstone;
});

const part1 = (rawInput: string) => {
  const hailstones = parseInput(rawInput);
  const minX = 200000000000000, minY = 200000000000000, maxX = 400000000000000, maxY = 400000000000000;

  const intersects = [];
  for (let h1 = 0; h1 < hailstones.length; h1++) {
    for (let h2 = h1 + 1; h2 < hailstones.length; h2++) {
      const intersection = intersect(hailstones[h1], hailstones[h2]);
      if (intersection) {
        intersects.push({ h1: hailstones[h1], h2: hailstones[h2], intersection: intersection });
      }
    }
  }

  console.log('intersecting', intersects
    .filter(r => r.intersection.x >= minX
      && r.intersection.x <= maxX
      && r.intersection.y >= minY
      && r.intersection.y <= maxY));

  return intersects
    .filter(r => r.intersection.x >= minX
      && r.intersection.x <= maxX
      && r.intersection.y >= minY
      && r.intersection.y <= maxY).length;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

function intersect(h1: Hailstone, h2: Hailstone) {
  const x1 = h1.px;
  const x2 = h1.px + h1.vx * 1000000000000000;
  const y1 = h1.py;
  const y2 = h1.py + h1.vy * 1000000000000000;
  const x3 = h2.px;
  const x4 = h2.px + h2.vx * 1000000000000000;
  const y3 = h2.py;
  const y4 = h2.py + h2.vy * 1000000000000000;

  // Check if none of the lines are of length 0
  if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
    return false
  }

  const denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))

  // Lines are parallel
  if (denominator === 0) {
    return false
  }

  let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator
  let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator

  // is the intersection along the segments
  if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
    return false
  }

  // Return a object with the x and y coordinates of the intersection
  let x = x1 + ua * (x2 - x1)
  let y = y1 + ua * (y2 - y1)

  return { x, y }
}

run({
  part1: {
    tests: [
      // {
      //   input: `
      //   19, 13, 30 @ -2,  1, -2
      //   18, 19, 22 @ -1, -1, -2
      //   20, 25, 34 @ -2, -2, -4
      //   12, 31, 28 @ -1, -2, -1
      //   20, 19, 15 @  1, -5, -3
      //   `,
      //   expected: 2,
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
