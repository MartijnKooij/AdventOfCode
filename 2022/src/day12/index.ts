import run from "aocrunner";

const dijkstra = (edges: any[], source: string, target: string) => {
  const Q = new Set(),
    prev = {},
    dist = {},
    adj = {}

  const vertex_with_min_dist = (Q: Set<unknown>, dist: { [x: string]: number; }) => {
    let min_distance = Infinity,
      u = null

    for (let v of Q) {
      if (dist[v] < min_distance) {
        min_distance = dist[v]
        u = v
      }
    }
    return u
  }

  for (const element of edges) {
    let v1 = element[0],
      v2 = element[1],
      len = element[2]

    Q.add(v1)
    Q.add(v2)

    dist[v1] = Infinity
    dist[v2] = Infinity

    if (adj[v1] === undefined) adj[v1] = {}
    if (adj[v2] === undefined) adj[v2] = {}

    adj[v1][v2] = len
    adj[v2][v1] = len
  }

  dist[source] = 0

  while (Q.size) {
    let u = vertex_with_min_dist(Q, dist),
      neighbors = Object.keys(adj[u]).filter(v => Q.has(v)) //Neighbor still in Q 

    Q.delete(u)

    if (u === target) break //Break when the target has been found

    for (let v of neighbors) {
      let alt = dist[u] + adj[u][v]
      if (alt < dist[v]) {
        dist[v] = alt
        prev[v] = u
      }
    }
  }

  {
    let u = target,
      S = [u],
      len = 0

    while (prev[u] !== undefined) {
      S.unshift(prev[u])
      len += adj[u][prev[u]]
      u = prev[u]
    }
    return [S, len]
  }
}

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((l) =>
    l.split("").map((c) => c.charCodeAt(0) - 97)
  );

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  input[0][0] = "a".charCodeAt(0) - 97;
  const startPos = { x: 0, y: 0 };
  let goalPos = { x: 0, y: 0 };
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x] === "E".charCodeAt(0) - 97) {
        input[y][x] = "z".charCodeAt(0) - 97;
        goalPos = { x, y };
      }
    }
  }

  const graph = [];
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (y > 0) {
        const diff = input[y - 1][x] - input[y][x];
        const dist = diff > 1 ? 9999999 : 1;
        graph.push([`${x}_${y}`, `${x}_${y - 1}`, dist]);
      }
      if (y < input.length - 1) {
        const diff = input[y + 1][x] - input[y][x];
        const dist = diff > 1 ? 9999999 : 1;
        graph.push([`${x}_${y}`, `${x}_${y + 1}`, dist]);
      }
      if (x > 0) {
        const diff = input[y][x - 1] - input[y][x];
        const dist = diff > 1 ? 9999999 : 1;
        graph.push([`${x}_${y}`, `${x - 1}_${y}`, dist]);
      }
      if (x < input.length - 1) {
        const diff = input[y][x + 1] - input[y][x];
        const dist = diff > 1 ? 9999999 : 1;
        graph.push([`${x}_${y}`, `${x + 1}_${y}`, dist]);
      }
    }
  }

  console.log('input', input, graph, `${startPos.x}_${startPos.y}`, `${goalPos.x}_${goalPos.y}`);

  let [path, length] = dijkstra(graph, `${startPos.x}_${startPos.y}`, `${goalPos.x}_${goalPos.y}`);
  console.log('output', path, length);

  return length;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `
        Sabqponm
        abcryxxl
        accszExk
        acctuvwj
        abdefghi`,
        expected: 31,
      },
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
  onlyTests: true,
});
