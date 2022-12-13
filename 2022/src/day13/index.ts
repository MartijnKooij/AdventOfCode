import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput.split('\n\n').map((t) => {
  const signals = t.split('\n');
  return {
    order: 0,
    left: JSON.parse(signals[0]),
    right: JSON.parse(signals[1])
  }
});

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let sum = 0;
  for (let index = 0; index < input.length; index++) {
    if (isCorrectOrder(input[index].left, input[index].right) !== -1) {
      sum += index + 1;
    }
  }

  return sum;
};

const part2 = (rawInput: string) => {
  const input = rawInput.replace(/^(?=\n)$|^\s*|\s*$|\n\n+/gm, '') + '\n[[2]]\n[[6]]';
  const packages = input.split('\n').filter(l => l).map((l) => {
    return {
      sort: JSON.parse(l).flat(),
      data: l
    };
  }).sort((a, b) => a.sort < b.sort ? -1 : a.sort > b.sort ? 1 : 0);

  console.log(packages);

  return (packages.findIndex(p => p.data === '[[2]]') + 1) * (packages.findIndex(p => p.data === '[[6]]') + 1);
};

const isCorrectOrder = (left: any, right: any, depth = 0): -1 | 0 | 1 => {
  // console.log('isCorrectOrder', ''.padStart(depth * 2), 'left', left, 'right', right);

  if (typeof left === 'number' && typeof right === 'number') {
    if (left < right) return 1;
    if (left > right) return -1;
    return 0;
  }

  if (Array.isArray(left) && Array.isArray(right)) {
    depth++;

    for (let index = 0; index < Math.max(left.length, right.length); index++) {
      if (index >= left.length) return 1;
      if (index >= right.length) return -1;
      const isCorrect = isCorrectOrder(left[index], right[index], depth)
      if (isCorrect !== 0) {
        return isCorrect;
      }
    }

    return 0;
  }

  if (typeof left === 'number') return isCorrectOrder([left], right, depth);
  if (typeof right === 'number') return isCorrectOrder(left, [right], depth);
  return 0;
}

run({
  part1: {
    tests: [
      // {
      //   input: `
      //   [1,1,3,1,1]
      //   [1,1,5,1,1]

      //   [[1],[2,3,4]]
      //   [[1],4]

      //   [9]
      //   [[8,7,6]]

      //   [[4,4],4,4]
      //   [[4,4],4,4,4]

      //   [7,7,7,7]
      //   [7,7,7]

      //   []
      //   [3]

      //   [[[]]]
      //   [[]]

      //   [1,[2,[3,[4,[5,6,7]]]],8,9]
      //   [1,[2,[3,[4,[5,6,0]]]],8,9]`,
      //   expected: 13,
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        [1,1,3,1,1]
        [1,1,5,1,1]
        
        [[1],[2,3,4]]
        [[1],4]
        
        [9]
        [[8,7,6]]
        
        [[4,4],4,4]
        [[4,4],4,4,4]
        
        [7,7,7,7]
        [7,7,7]
        
        []
        [3]
        
        [[[]]]
        [[]]
        
        [1,[2,[3,[4,[5,6,7]]]],8,9]
        [1,[2,[3,[4,[5,6,0]]]],8,9]`,
        expected: 140,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
