import run from 'aocrunner';

type point = { x: number, y: number };

const offset = 1500000;

const dist = (start: point, end: point): number => Math.abs(end.x - start.x) + Math.abs(end.y - start.y);
const parseInput = (rawInput: string): point[][] => rawInput.split('\n').map((l) => {
  const points = l.replace(/x=/g, '').replace(/y=/g, '').replace('Sensor at ', '').replace(' closest beacon is at ', '');
  return points.split(':').map((p) => {
    const point = p.split(',').map(v => parseInt(v, 10));
    return { x: point[0] + offset, y: point[1] + offset };
  })
});

const part1 = (rawInput: string) => {
  const mapY = 2000000 + offset;

  const drawRange = (map: string[], center: point, distance: number): string[] => {
    if (center.y - distance <= mapY && center.y + distance >= mapY) {
      for (let x = center.x - distance; x <= center.x + distance; x++) {
        if (dist(center, { x, y: mapY }) <= distance && map[x] === '.') {
          map[x] = '#';
        }
      }
  
    }
    return map;
  }
  const drawMap = (): string[] => {
    return ''.padEnd(6000000, '.').split('');
  }

  const input = parseInput(rawInput);
  let map = drawMap();

  for (const points of input) {
    if (points[0].y === mapY) {
      map[points[0].x] = 'S';
    }
    if (points[1].y === mapY) {
      map[points[1].x] = 'B';
    }

    const distance = dist(points[0], points[1]);
    map = drawRange(map, points[0], distance);
  }

  return map.filter(t => t === '#').length;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      // {
      //   input: `
      //   Sensor at x=2, y=18: closest beacon is at x=-2, y=15
      //   Sensor at x=9, y=16: closest beacon is at x=10, y=16
      //   Sensor at x=13, y=2: closest beacon is at x=15, y=3
      //   Sensor at x=12, y=14: closest beacon is at x=10, y=16
      //   Sensor at x=10, y=20: closest beacon is at x=10, y=16
      //   Sensor at x=14, y=17: closest beacon is at x=10, y=16
      //   Sensor at x=8, y=7: closest beacon is at x=2, y=10
      //   Sensor at x=2, y=0: closest beacon is at x=2, y=10
      //   Sensor at x=0, y=11: closest beacon is at x=2, y=10
      //   Sensor at x=20, y=14: closest beacon is at x=25, y=17
      //   Sensor at x=17, y=20: closest beacon is at x=21, y=22
      //   Sensor at x=16, y=7: closest beacon is at x=15, y=3
      //   Sensor at x=14, y=3: closest beacon is at x=15, y=3
      //   Sensor at x=20, y=1: closest beacon is at x=15, y=3`,
      //   expected: 26,
      // },
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
  onlyTests: false,
});