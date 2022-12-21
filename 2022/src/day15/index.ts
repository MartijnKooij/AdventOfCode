import run from 'aocrunner';
import * as fs from 'fs';

type point = { x: number, y: number };

const dist = (start: point, end: point): number => Math.abs(end.x - start.x) + Math.abs(end.y - start.y);

const part1 = (rawInput: string) => {
  const offset = 1500000;
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

  const parseInput = (rawInput: string): point[][] => rawInput.split('\n').map((l) => {
    const points = l.replace(/x=/g, '').replace(/y=/g, '').replace('Sensor at ', '').replace(' closest beacon is at ', '');
    return points.split(':').map((p) => {
      const point = p.split(',').map(v => parseInt(v, 10));
      return { x: point[0] + offset, y: point[1] + offset };
    })
  });

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

type scan = {
  id: number,
  topToRightInner: point[],
  rightToBottomInner: point[],
  bottomToLeftInner: point[],
  leftToTopInner: point[],
  topToRightOuter: point[],
  rightToBottomOuter: point[],
  bottomToLeftOuter: point[],
  leftToTopOuter: point[],
  center: point,
  beacon: point,
  distance: number
};

const part2 = (rawInput: string) => {
  const offset = 0;
  const limits: point = { x: 20, y: 20 };

  const slope = (a: point, b: point): number => {
    if (a.x == b.x) {
      return 0;
    }

    return (b.y - a.y) / (b.x - a.x);
  }

  const intercept = (point: point, slope: number): number => {
    if (slope === null) {
      // vertical line
      return point.x;
    }

    return point.y - slope * point.x;
  }

  const line = (start: point, end: point): point[] => {
    const m = slope(start, end);
    const b = intercept(start, m);

    const coordinates: point[] = [];
    for (let x = Math.min(start.x, end.x); x <= Math.max(start.x, end.x); x++) {
      const y = m * x + b;
      if (x >= 0 && x < limits.x && y >= 0 && y < limits.y) {
        coordinates.push({ x, y });
      }
    }

    return coordinates;
  }

  const parseInput = (rawInput: string): scan[] => rawInput.split('\n').map((l, i) => {
    const pointData = l.replace(/x=/g, '').replace(/y=/g, '').replace('Sensor at ', '').replace(' closest beacon is at ', '');
    const points: point[] = pointData.split(':').map((p) => {
      const point = p.split(',').map(v => parseInt(v, 10));
      return { x: point[0] + offset, y: point[1] + offset };
    });

    const distance = dist(points[0], points[1]);

    const topInner = { x: points[0].x, y: points[0].y - distance };
    const rightInner = { x: points[0].x + distance, y: points[0].y };
    const bottomInner = { x: points[0].x, y: points[0].y + distance };
    const leftInner = { x: points[0].x - distance, y: points[0].y };

    const topOuter = { x: points[0].x, y: points[0].y - distance - 1 };
    const rightOuter = { x: points[0].x + distance + 1, y: points[0].y };
    const bottomOuter = { x: points[0].x, y: points[0].y + distance + 1 };
    const leftOuter = { x: points[0].x - distance - 1, y: points[0].y };

    return {
      id: i,
      topToRightInner: line(topInner, rightInner),
      rightToBottomInner: line(rightInner, bottomInner),
      bottomToLeftInner: line(bottomInner, leftInner),
      leftToTopInner: line(leftInner, topInner),

      topToRightOuter: line(topOuter, rightOuter),
      rightToBottomOuter: line(rightOuter, bottomOuter),
      bottomToLeftOuter: line(bottomOuter, leftOuter),
      leftToTopOuter: line(leftOuter, topOuter),
      center: points[0],
      beacon: points[1],
      distance
    };
  });

  const scans = parseInput(rawInput);

  const drawLine = (points: point[]) => {
    for (const point of points) {
      if (point.x >= 0 && point.x < limits.x && point.y >= 0 && point.y < limits.y) {
        map[point.y][point.x] = '#';
      }
    }
  }

  const drawScan = (scan: scan) => {
    for (let y = scan.center.y - scan.distance; y <= scan.center.y + scan.distance; y++) {
      for (let x = scan.center.x - scan.distance; x <= scan.center.x + scan.distance; x++) {
        if (x >= 0 && x < limits.x && y >= 0 && y < limits.y) {
          if (dist(scan.center, { x, y }) <= scan.distance && map[y][x] === '.') {
            map[y][x] = '#';
          }
        }
      }
    }
    return map;
  }

  const map: string[][] = [];
  for (let y = 0; y < limits.y; y++) {
    map.push(''.padEnd(limits.x, '.').split(''));
  }

  // fs.writeFileSync('./src/day15/map.txt', JSON.stringify(scans));

  const pointsOnEdgesOfScans = scans.flatMap(s => s.topToRightInner.concat(s.rightToBottomInner, s.bottomToLeftInner, s.leftToTopInner));
  const pointOutsideOfScans = scans.flatMap(s => s.topToRightOuter.concat(s.rightToBottomOuter, s.bottomToLeftOuter, s.leftToTopOuter));

  const freePoints = pointOutsideOfScans.filter(p => pointsOnEdgesOfScans .includes(p));
  let freePoint = null;
  if (freePoints.length > 0) freePoint = freePoints[0];

  console.log('free point found?', freePoint);
  fs.writeFileSync('./src/day15/map.txt', map.map(row => row.join('')).join('\n'));

  return 0;
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
      {
        input: `
        Sensor at x=2, y=18: closest beacon is at x=-2, y=15
        Sensor at x=9, y=16: closest beacon is at x=10, y=16
        Sensor at x=13, y=2: closest beacon is at x=15, y=3
        Sensor at x=12, y=14: closest beacon is at x=10, y=16
        Sensor at x=10, y=20: closest beacon is at x=10, y=16
        Sensor at x=14, y=17: closest beacon is at x=10, y=16
        Sensor at x=8, y=7: closest beacon is at x=2, y=10
        Sensor at x=2, y=0: closest beacon is at x=2, y=10
        Sensor at x=0, y=11: closest beacon is at x=2, y=10
        Sensor at x=20, y=14: closest beacon is at x=25, y=17
        Sensor at x=17, y=20: closest beacon is at x=21, y=22
        Sensor at x=16, y=7: closest beacon is at x=15, y=3
        Sensor at x=14, y=3: closest beacon is at x=15, y=3
        Sensor at x=20, y=1: closest beacon is at x=15, y=3`,
        expected: 56000011,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
