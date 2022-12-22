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
  const getConnectedCubes = (cube: cube): cube[] => {
    const connectedCubes: cube[] = [];
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        for (let dz = -1; dz <= 1; dz++) {
          const dist = Math.abs(dx) + Math.abs(dy) + Math.abs(dz);
          if (dist === 1) connectedCubes.push({x: cube.x + dx, y: cube.y + dy, z: cube.z + dz, edgesExposed: 0})
        }
      }
    }
    return connectedCubes;
  }

  const bfs = (cubes: cube[], minX: number, maxX: number, minY: number, maxY: number, minZ: number, maxZ: number): number => {
    let exposed = 0;
    const visited = new Set();
  
    const stack = [[minX - 1, minY - 1, minZ - 1]];
    while (stack.length) {
      const current = stack.pop()!;
      let [x, y, z] = current;
    
      const visitedKey = `${x}-${y}-${z}`;
      if (visited.has(visitedKey)) continue;
      visited.add(visitedKey);

      const connectedCubes = getConnectedCubes({x, y, z, edgesExposed: 0});
      for (const cube of connectedCubes) {
        if (cube.x < minX - 1 || cube.x > maxX + 1 || cube.y < minY - 1 || cube.y > maxY + 1 || cube.z < minZ - 1 || cube.z > maxZ + 1) continue;

        if (cubes.find(c => c.x === cube.x && c.y === cube.y && c.z === cube.z)) exposed++;
        else if (!visited.has(`${cube.x}-${cube.y}-${cube.z}`)) stack.push([cube.x, cube.y, cube.z]);
      }  
    }
  
    return exposed;
  }
  
  const cubes = parseInput(rawInput);

  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity, minZ = Infinity, maxZ = -Infinity;
  for (const cube of cubes) {
    minX = Math.min(minX, cube.x);
    maxX = Math.max(maxX, cube.x);
    minY = Math.min(minY, cube.y);
    maxY = Math.max(maxY, cube.y);
    minZ = Math.min(minZ, cube.z);
    maxZ = Math.max(maxZ, cube.z);
  }

  const exposed = bfs(cubes, minX, maxX, minY, maxY, minZ, maxZ);

  return exposed;
};

run({
  part1: {
    tests: [
      // {
      //   input: `
      //   2,2,2
      //   1,2,2
      //   3,2,2
      //   2,1,2
      //   2,3,2
      //   2,2,1
      //   2,2,3
      //   2,2,4
      //   2,2,6
      //   1,2,5
      //   3,2,5
      //   2,1,5
      //   2,3,5`,
      //   expected: 64,
      // },
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
  onlyTests: false,
});
