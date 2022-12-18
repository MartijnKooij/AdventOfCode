import run from 'aocrunner';

type cube = { x: number, y: number, z: number, edgesExposed: number };
const parseInput = (rawInput: string): cube[] => rawInput.split('\n').map((l) => {
  const parts = l.split(',');
  return {
    x: parseInt(parts[0], 10),
    y: parseInt(parts[1], 10),
    z: parseInt(parts[2], 10),
    edgesExposed: 6
  }
});

const part1 = (rawInput: string) => {
  const cubes = parseInput(rawInput);
  let edges = cubes.length * 6;

  for (let a = 0; a < cubes.length; a++) {
    for (let b = a + 1; b < cubes.length; b++) {
      const cubeA = cubes[a];
      const cubeB = cubes[b];
      const hasSameX = Math.abs(cubeA.x - cubeB.x) === 0;
      const hasSameY = Math.abs(cubeA.y - cubeB.y) === 0;
      const hasSameZ = Math.abs(cubeA.z - cubeB.z) === 0;
      const touchingX = Math.abs(cubeA.x - cubeB.x) === 1;
      const touchingY = Math.abs(cubeA.y - cubeB.y) === 1;
      const touchingZ = Math.abs(cubeA.z - cubeB.z) === 1;
      const sameEdges = [hasSameX, hasSameY, hasSameZ];
      const touchingEdges = [touchingX, touchingY, touchingZ];

      if (sameEdges.filter(s => s).length === 2 && touchingEdges.filter(t => t).length === 1) {
        cubeA.edgesExposed -= 1;
        cubeB.edgesExposed -= 1;
      }
    }
  }

  return cubes.reduce((p, c) => p + c.edgesExposed, 0);
};

const part2 = (rawInput: string) => {
  const cubes = parseInput(rawInput);
  let edges = cubes.length * 6;

  for (let a = 0; a < cubes.length; a++) {
    for (let b = a + 1; b < cubes.length; b++) {
      const cubeA = cubes[a];
      const cubeB = cubes[b];
      const hasSameX = Math.abs(cubeA.x - cubeB.x) === 0;
      const hasSameY = Math.abs(cubeA.y - cubeB.y) === 0;
      const hasSameZ = Math.abs(cubeA.z - cubeB.z) === 0;
      const touchingX = Math.abs(cubeA.x - cubeB.x) === 1;
      const touchingY = Math.abs(cubeA.y - cubeB.y) === 1;
      const touchingZ = Math.abs(cubeA.z - cubeB.z) === 1;
      const sameEdges = [hasSameX, hasSameY, hasSameZ];
      const touchingEdges = [touchingX, touchingY, touchingZ];

      if (sameEdges.filter(s => s).length === 2 && touchingEdges.filter(t => t).length === 1) {
        cubeA.edgesExposed -= 1;
        cubeB.edgesExposed -= 1;
      }
    }
  }

  console.log(cubes);
  return cubes.filter(c => c.edgesExposed > 0).reduce((p, c) => p + c.edgesExposed, 0);
};

run({
  part1: {
    tests: [
      {
        input: `
        2,2,2
        1,2,2
        3,2,2
        2,1,2
        2,3,2
        2,2,1
        2,2,3
        2,2,4
        2,2,6
        1,2,5
        3,2,5
        2,1,5
        2,3,5`,
        expected: 64,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        2,2,2
        1,2,2
        3,2,2
        2,1,2
        2,3,2
        2,2,1
        2,2,3
        2,2,4
        2,2,6
        1,2,5
        3,2,5
        2,1,5
        2,3,5`,
        expected: 58,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
