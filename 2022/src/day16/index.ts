import run from 'aocrunner';
import * as fs from 'fs';
import { join } from 'path';

type distanceMap = { [x: string]: number };
type room = { id: string, flowRate: number, tunnels: string[], distanceMap: undefined | distanceMap };
type path = {
  currentRoomId: string,
  activeRoomIds: string[],
  timeLeft: number,
  finished: boolean,
  steps: string[],
  releasedPressure: number,
  key?: string
};

const parseInput = (rawInput: string): room[] => rawInput.split('\n').map((l) => {
  const parts = l.split(';');
  const id = parts[0].substring(6, 8);
  const flowRate = parseInt(parts[0].split('=')[1], 10);
  const tunnels = parts[1].replace(' tunnels lead to valves ', '').replace(' tunnel leads to valve ', '').split(', ');

  return {
    id,
    flowRate,
    tunnels: tunnels,
    distanceMap: undefined
  };
});

const part1 = (rawInput: string) => {
  const rooms = parseInput(rawInput);
  console.table(rooms);

  let roomById: { [x: string]: room; } = {};
  rooms.forEach((n) => roomById[n.id] = n);

  const activeRooms = () => rooms.filter(n => n.flowRate > 0);

  const distanceMap = (startId: string, distances: distanceMap = {}): distanceMap => {
    if (roomById[startId].distanceMap) return roomById[startId].distanceMap ?? {};

    const walk = (name: string, steps: number) => {
      if (distances[name] != undefined && distances[name] <= steps) return;
      distances[name] = steps;
      roomById[name].tunnels.forEach((n: any) => walk(n, steps + 1));
    }
    walk(startId, 0);
    roomById[startId].distanceMap = distances;
    return distances;
  }

  const computePaths = (timeLeft: number) => {
    let paths: path[] = [{
      currentRoomId: 'AA',
      activeRoomIds: activeRooms().map((n) => n.id),
      timeLeft: timeLeft,
      finished: false,
      steps: [],
      releasedPressure: 0
    }];

    let max = 0;

    for (const path of paths) {
      if (path.timeLeft <= 0) path.finished = true;
      if (path.finished) continue;

      let distances = distanceMap(path.currentRoomId);
      let moved = false;

      path.activeRoomIds.forEach((activeRoom: string) => {
        if (activeRoom === path.currentRoomId) return true;
        if (path.timeLeft - distances[activeRoom] <= 1) return true;

        moved = true;
        paths.push({
          currentRoomId: activeRoom,
          activeRoomIds: path.activeRoomIds.filter((v: any) => v != activeRoom),
          timeLeft: path.timeLeft - distances[activeRoom] - 1,
          finished: false,
          steps: [...path.steps, activeRoom],
          releasedPressure: path.releasedPressure + (path.timeLeft - distances[activeRoom] - 1) * roomById[activeRoom].flowRate
        })
      });

      if (!moved) path.finished = true;
      if (path.finished && path.releasedPressure > max) max = path.releasedPressure;
    }

    return paths.filter(p => p.finished).sort((a, b) => b.releasedPressure - a.releasedPressure);
  }

  return computePaths(30)[0].releasedPressure;
};

const part2 = (rawInput: string) => {
  const rooms = parseInput(rawInput);
  console.table(rooms);

  let roomById: { [x: string]: room; } = {};
  rooms.forEach((n) => roomById[n.id] = n);

  const activeRooms = () => rooms.filter(n => n.flowRate > 0);

  const distanceMap = (startId: string, distances: distanceMap = {}): distanceMap => {
    if (roomById[startId].distanceMap) return roomById[startId].distanceMap ?? {};

    const walk = (name: string, steps: number) => {
      if (distances[name] != undefined && distances[name] <= steps) return;
      distances[name] = steps;
      roomById[name].tunnels.forEach(n => walk(n, steps + 1));
    }
    walk(startId, 0);
    roomById[startId].distanceMap = distances;
    return distances;
  }

  const computePaths = (timeLeft: number) => {
    let paths: path[] = [{
      currentRoomId: 'AA',
      activeRoomIds: activeRooms().map((n) => n.id),
      timeLeft: timeLeft,
      finished: false,
      steps: [],
      releasedPressure: 0
    }];

    let max = 0;

    for (const path of paths) {
      if (path.timeLeft <= 0) path.finished = true;
      if (path.finished) continue;

      let distances = distanceMap(path.currentRoomId);
      let moved = false;

      path.activeRoomIds.forEach((activeRoomId: string) => {
        if (activeRoomId === path.currentRoomId) return true;
        if (path.timeLeft - distances[activeRoomId] <= 1) return true;

        moved = true;
        paths.push({
          currentRoomId: activeRoomId,
          activeRoomIds: path.activeRoomIds.filter((v: any) => v != activeRoomId),
          timeLeft: path.timeLeft - distances[activeRoomId] - 1,
          finished: false,
          steps: [...path.steps, activeRoomId],
          releasedPressure: path.releasedPressure + (path.timeLeft - distances[activeRoomId] - 1) * roomById[activeRoomId].flowRate
        });
      });

      if (!moved) path.finished = true;
      if (path.finished && path.releasedPressure > max) max = path.releasedPressure;
    }

    return paths.sort((a, b) => b.releasedPressure - a.releasedPressure);
  }

  const paths = computePaths(26);
  const active = activeRooms().map(r => r.id);
  let maxPressure = 0;

  for (let me = 0; me < paths.length; me++) {
    for (let elephant = me + 1; elephant < paths.length; elephant++) {
      const myPath = paths[me];
      const elephantPath = paths[elephant];
      const uniqueSets = myPath.steps.filter(r => active.includes(r)).every(r => !elephantPath.steps.filter(r => active.includes(r)).includes(r));
      const pressure = myPath.releasedPressure + elephantPath.releasedPressure;
      if (uniqueSets && pressure > maxPressure) {
        maxPressure = pressure;
      }
    }
  }

  return maxPressure;
};

run({
  part1: {
    tests: [
      // {
      //   input: `
      //   Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
      //   Valve BB has flow rate=13; tunnels lead to valves CC, AA
      //   Valve CC has flow rate=2; tunnels lead to valves DD, BB
      //   Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
      //   Valve EE has flow rate=3; tunnels lead to valves FF, DD
      //   Valve FF has flow rate=0; tunnels lead to valves EE, GG
      //   Valve GG has flow rate=0; tunnels lead to valves FF, HH
      //   Valve HH has flow rate=22; tunnel leads to valve GG
      //   Valve II has flow rate=0; tunnels lead to valves AA, JJ
      //   Valve JJ has flow rate=21; tunnel leads to valve II`,
      //   expected: 1651,
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: `
      //   Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
      //   Valve BB has flow rate=13; tunnels lead to valves CC, AA
      //   Valve CC has flow rate=2; tunnels lead to valves DD, BB
      //   Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
      //   Valve EE has flow rate=3; tunnels lead to valves FF, DD
      //   Valve FF has flow rate=0; tunnels lead to valves EE, GG
      //   Valve GG has flow rate=0; tunnels lead to valves FF, HH
      //   Valve HH has flow rate=22; tunnel leads to valve GG
      //   Valve II has flow rate=0; tunnels lead to valves AA, JJ
      //   Valve JJ has flow rate=21; tunnel leads to valve II`,
      //   expected: 1707,
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
