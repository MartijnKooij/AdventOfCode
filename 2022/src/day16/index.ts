import run from 'aocrunner';

type distanceMap = { [x: string]: number };
type room = { id: string, flowRate: number, tunnels: string[], distanceMap: undefined | distanceMap };
type path = {
  currentRoom: string,
  active: string[],
  timeLeft: number,
  finished: boolean,
  steps: string[],
  releasedPressure: number
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
      currentRoom: 'AA',
      active: activeRooms().map((n) => n.id),
      timeLeft: timeLeft,
      finished: false,
      steps: [],
      releasedPressure: 0
    }];

    let max = 0;

    for (const path of paths) {
      if (path.timeLeft <= 0) path.finished = true;
      if (path.finished) continue;

      let distances = distanceMap(path.currentRoom);
      let moved = false;

      path.active.forEach((activeRoom: string) => {
        if (activeRoom === path.currentRoom) return true;
        if (path.timeLeft - distances[activeRoom] <= 1) return true;

        moved = true;
        paths.push({
          currentRoom: activeRoom,
          active: path.active.filter((v: any) => v != activeRoom),
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
      roomById[name].tunnels.forEach((n: any) => walk(n, steps + 1));
    }
    walk(startId, 0);
    roomById[startId].distanceMap = distances;
    return distances;
  }

  const computePaths = (timeLeft: number) => {
    let paths: path[] = [{
      currentRoom: 'AA',
      active: activeRooms().map((n) => n.id),
      timeLeft: timeLeft,
      finished: false,
      steps: [],
      releasedPressure: 0
    }];

    let max = 0;

    for (const path of paths) {
      if (path.timeLeft <= 0) path.finished = true;
      if (path.finished) continue;

      let distances = distanceMap(path.currentRoom);
      let moved = false;

      path.active.forEach((activeRoom: string) => {
        if (activeRoom === path.currentRoom) return true;
        if (path.timeLeft - distances[activeRoom] <= 1) return true;

        moved = true;
        paths.push({
          currentRoom: activeRoom,
          active: path.active.filter((v: any) => v != activeRoom),
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

  const paths = computePaths(26);
  for (let p = 0; p < paths.length; p++) {
    paths[p].steps.sort();
  }

  const uniquePaths: path[] = [];
  for (const path of paths) {
    if (!uniquePaths.find((p => p.steps.join('') === path.steps.join('')))) {
      uniquePaths.push(path);
    }
  }
  console.table(uniquePaths);

  return { p: paths.length, u: uniquePaths.length };
};

run({
  part1: {
    tests: [
      {
        input: `
        Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
        Valve BB has flow rate=13; tunnels lead to valves CC, AA
        Valve CC has flow rate=2; tunnels lead to valves DD, BB
        Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
        Valve EE has flow rate=3; tunnels lead to valves FF, DD
        Valve FF has flow rate=0; tunnels lead to valves EE, GG
        Valve GG has flow rate=0; tunnels lead to valves FF, HH
        Valve HH has flow rate=22; tunnel leads to valve GG
        Valve II has flow rate=0; tunnels lead to valves AA, JJ
        Valve JJ has flow rate=21; tunnel leads to valve II`,
        expected: 1651,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
        Valve BB has flow rate=13; tunnels lead to valves CC, AA
        Valve CC has flow rate=2; tunnels lead to valves DD, BB
        Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
        Valve EE has flow rate=3; tunnels lead to valves FF, DD
        Valve FF has flow rate=0; tunnels lead to valves EE, GG
        Valve GG has flow rate=0; tunnels lead to valves FF, HH
        Valve HH has flow rate=22; tunnel leads to valve GG
        Valve II has flow rate=0; tunnels lead to valves AA, JJ
        Valve JJ has flow rate=21; tunnel leads to valve II`,
        expected: 1707,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
