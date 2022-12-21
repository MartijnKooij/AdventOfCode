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
  outline: point[],
  center: point,
  distance: number
};

const part2 = (rawInput: string) => {
  const limits = { startX: 3000000, endX: 4000000, startY: 3000000, endY: 4000000 };

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
      if (x >= limits.startX && x < limits.endX && y >= limits.startY && y < limits.endY) {
        coordinates.push({ x, y });
      }
    }

    return coordinates;
  }

  const parseLength = rawInput.split('\n').length;
  const parseInput = (rawInput: string): scan[] => rawInput.split('\n').map((l, i) => {
    const pointData = l.replace(/x=/g, '').replace(/y=/g, '').replace('Sensor at ', '').replace(' closest beacon is at ', '');
    const points: point[] = pointData.split(':').map((p) => {
      const point = p.split(',').map(v => parseInt(v, 10));
      return { x: point[0], y: point[1] };
    });

    console.log(`Still parsing... ${i} / ${parseLength}`);

    const distance = dist(points[0], points[1]);

    const topOuter = { x: points[0].x, y: points[0].y - distance - 1 };
    const rightOuter = { x: points[0].x + distance + 1, y: points[0].y };
    const bottomOuter = { x: points[0].x, y: points[0].y + distance + 1 };
    const leftOuter = { x: points[0].x - distance - 1, y: points[0].y };

    const topToRightOuter = line(topOuter, rightOuter);
    const rightToBottomOuter = line(rightOuter, bottomOuter);
    const bottomToLeftOuter = line(bottomOuter, leftOuter);
    const leftToTopOuter = line(leftOuter, topOuter);

    let allOutlinePoints = topToRightOuter.concat(rightToBottomOuter, bottomToLeftOuter, leftToTopOuter);

    return {
      outline: allOutlinePoints,
      center: points[0],
      distance
    }
  });

  const scans = parseInput(rawInput);
  const pointOutsideOfScans = scans.flatMap(s => s.outline);
  let freePoint = null;
  let index = 0;
  for (const point of pointOutsideOfScans) {
    if (index % 5000 === 0) {
      console.log(`Still searching... ${index} / ${pointOutsideOfScans.length}`);
    }
    index++;

    let isPointFree = true;
    for (const scan of scans) {
      if (dist(point, scan.center) <= scan.distance) {
        isPointFree = false;
        break;
      }
    }
    if (isPointFree) {
      freePoint = point;
      break;
    }
  }
  
  console.log('free point found?', freePoint);

  return (freePoint?.x ?? 0) * 4000000 + (freePoint?.y ?? 0);
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
      //   expected: 56000011,
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
