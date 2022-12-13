import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput.split('\n\n').map((t) => {
  const signals = t.split('\n');
  return {
    left: JSON.parse(signals[0]),
    right: JSON.parse(signals[1])
  }
});

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let sum = 0;
  for (let index = 0; index < input.length; index++) {
    if (isCorrectOrder(input[index].left, input[index].right) !== -1) {
      console.log('index', index + 1);
      sum += index + 1;
    }
  }

  return sum;
};

const isCorrectOrder = (left: any, right: any, depth = 0): -1 | 0 | 1 => {
  console.log('isCorrectOrder', ''.padStart(depth * 2), 'left', left, 'right', right);
  if (!left && right) return 1;
  if (left && !right) return -1;
  if (Array.isArray(left) && !Array.isArray(right)) right = [right];
  if (!Array.isArray(left) && Array.isArray(right)) left = [left];
  if (Array.isArray(left)) {
    depth ++;

    for (let index = 0; index < Math.max(left.length, right.length); index++) {
      const isCorrect = isCorrectOrder(left[index], right[index], depth)
      if (isCorrect !== 0) {
        return isCorrect;
      }
      
    }
  } else  {
    if (left < right || !left) {
      console.log('left value was smaller');
      return 1;
    } else if (left === right) {
      return 0;
    }
    console.log('right value was larger');

    return -1;
  }

  return 0;
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
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
        expected: 13,
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
  onlyTests: false,
});
