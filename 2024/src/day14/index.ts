import run from 'aocrunner';
import { AocMap } from '../utils/map.js';

const parseInput = (rawInput: string) => rawInput.split('\n').map((line) => {
  const data = line.split(' ');
  return {
    p: data[0].split('=')[1].split(',').map(Number),
    v: data[1].split('=')[1].split(',').map(Number),
  }
});

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const mapHeight = 103; // 7 / 103
  const mapWidth = 101; // 11 / 101
  let mapData = '.'.repeat(mapWidth);
  for (let i = 1; i < mapHeight; i++) {
    mapData += '\n' + '.'.repeat(mapWidth);
  }
  const map = new AocMap(mapData);

  for (let t = 0; t < 100; t++) {
    for (const robot of input) {
      let newPX = robot.p[0] + robot.v[0];
      let newPY = robot.p[1] + robot.v[1];

      // If x or y is out of the map bounds wrap around to the other side.
      newPX = newPX < 0 ? mapWidth + newPX : newPX;
      newPY = newPY < 0 ? mapHeight + newPY : newPY;
      newPX = newPX >= mapWidth ? newPX - mapWidth : newPX;
      newPY = newPY >= mapHeight ? newPY - mapHeight : newPY;

      robot.p[0] = newPX;
      robot.p[1] = newPY;
    }
  }

  for (const { p, v } of input) {
    const mapToken = map.get(p[0], p[1]);
    const newMapToken = isNaN(Number(mapToken)) ? 1 : Number(mapToken) + 1;
    map.set(p[0], p[1], newMapToken.toString());
  }
  for (let y = 0; y < mapHeight; y++) {
    for (let x = 0; x < mapWidth; x++) {
      if (x === Math.floor(mapWidth / 2) || y === Math.floor(mapHeight / 2)) {
        map.set(x, y, ' ');
        continue;
      }
    }
  }
  console.log(map.toString());

  // Count how many p's are in each of the 4 quadrants defined by the width and height of the map.\
  // Each tile will contain a number representing how many p's are in that tile.
  const quadrants = [0, 0, 0, 0];
  for (let y = 0; y < mapHeight; y++) {
    for (let x = 0; x < mapWidth; x++) {
      const mapToken = map.get(x, y);
      if (x < Math.floor(mapWidth / 2) && y < Math.floor(mapHeight / 2)) {
        quadrants[0] += isNaN(Number(mapToken)) ? 0 : Number(mapToken);
      } else if (x >= Math.floor(mapWidth / 2) && y < Math.floor(mapHeight / 2)) {
        quadrants[1] += isNaN(Number(mapToken)) ? 0 : Number(mapToken);
      } else if (x < Math.floor(mapWidth / 2) && y >= Math.floor(mapHeight / 2)) {
        quadrants[2] += isNaN(Number(mapToken)) ? 0 : Number(mapToken);
      } else {
        quadrants[3] += isNaN(Number(mapToken)) ? 0 : Number(mapToken);
      }
    }
  }
  console.log(quadrants);

  return quadrants.reduce((acc, val) => acc * val, 1);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const mapHeight = 103; // 7 / 103
  const mapWidth = 101; // 11 / 101
  let mapData = '.'.repeat(mapWidth);
  for (let i = 1; i < mapHeight; i++) {
    mapData += '\n' + '.'.repeat(mapWidth);
  }
  const map = new AocMap(mapData);

  const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const draw = async (t: number) => {
    for (const robot of input) {
      let newPX = robot.p[0] + robot.v[0];
      let newPY = robot.p[1] + robot.v[1];

      // If x or y is out of the map bounds wrap around to the other side.
      newPX = newPX < 0 ? mapWidth + newPX : newPX;
      newPY = newPY < 0 ? mapHeight + newPY : newPY;
      newPX = newPX >= mapWidth ? newPX - mapWidth : newPX;
      newPY = newPY >= mapHeight ? newPY - mapHeight : newPY;

      robot.p[0] = newPX;
      robot.p[1] = newPY;
    }
    for (let y = 0; y < mapHeight; y++) {
      for (let x = 0; x < mapWidth; x++) {
        map.set(x, y, '.');
      }
    }
    for (const { p, v } of input) {
      if (map.get(p[0], p[1]) === '.') {
        map.set(p[0], p[1], '#');
      }
    }
    console.log('time:', t);
    if (t > 8000) {
      console.log(map.toString());
    }
  }

  const hasCluster = () => {
    // Check if there's a cluster of '#' in the map.
    for (let y = 0; y < mapHeight; y++) {
      for (let x = 0; x < mapWidth; x++) {
        if (map.get(x, y) === '#') {
          // Check if the surounding tiles are also '#' while considering the map's bounds.
          let cluster = 0;
          cluster += map.get(x - 1 < 0 ? mapWidth - 1 : x - 1, y) === '#' ? 1 : 0;
          cluster += map.get(x + 1 >= mapWidth ? 0 : x + 1, y) === '#' ? 1 : 0;
          cluster += map.get(x, y - 1 < 0 ? mapHeight - 1 : y - 1) === '#' ? 1 : 0;
          cluster += map.get(x, y + 1 >= mapHeight ? 0 : y + 1) === '#' ? 1 : 0;
          // Check diagonals.
          cluster += map.get(x - 1 < 0 ? mapWidth - 1 : x - 1, y - 1 < 0 ? mapHeight - 1 : y - 1) === '#' ? 1 : 0;
          cluster += map.get(x + 1 >= mapWidth ? 0 : x + 1, y - 1 < 0 ? mapHeight - 1 : y - 1) === '#' ? 1 : 0;
          cluster += map.get(x - 1 < 0 ? mapWidth - 1 : x - 1, y + 1 >= mapHeight ? 0 : y + 1) === '#' ? 1 : 0;
          cluster += map.get(x + 1 >= mapWidth ? 0 : x + 1, y + 1 >= mapHeight ? 0 : y + 1) === '#' ? 1 : 0;

          if (cluster >= 5) {
            return true;
          }
        }
      }
    }
  }

  (async () => {
    for (let t = 0; t < 8200; t++) {
      if (t > 8000) {
        process.stdout.write('\x1Bc');
      }

      await draw(t);

      let timeout = 0;
      if (hasCluster() && t > 8000) {
        timeout = 5000;
      }
      if (timeout > 0) {
        await sleep(timeout);
      }
    }
  })();

  return 8168;
};

run({
  part1: {
    tests: [
      {
        input: `p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3
`,
        expected: 12,
      },
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
