import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput.split(' ').map(Number);

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  for (let i = 0; i < 25; i++) {
    let index = 0;
    while (index < input.length) {
      const value = input[index];
      if (value === 0) {
        input[index] = 1;
        index++;
        continue
      }

      if (value.toString().length % 2 === 0) {
        const leftNum = Number(value.toString().slice(0, value.toString().length / 2));
        const rightNum = Number(value.toString().slice(value.toString().length / 2));
        input[index] = leftNum;
        input.splice(index + 1, 0, rightNum);
        index += 2;
        continue
      }

      input[index] = input[index] * 2024;
      index++;
    }
  }

  return input.length;
};

const addOrUpdate = (map: Map<number, number>, key: number, newValue: number) => {
  if (!map.has(key)) {
    map.set(key, newValue);
  } else {
    map.set(key, map.get(key)! + newValue);
  }
};
const removeOrUpdate = (map: Map<number, number>, key: number) => {
  if (map.get(key) === 1) {
    map.delete(key);
  } else {
    map.set(key, map.get(key)! - 1);
  }
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const map = new Map<number, number>();
  input.forEach(value => map.set(value, 1));

  for (let i = 0; i < 75; i++) {
    // console.log('DEBUG', i, map.size, map.entries());
    const keys = Array.from(map.keys());
    const newMap = new Map<number, number>();
    for (const key of keys) {
      const value = map.get(key);
      if (!value) {
        continue;
      }

      if (key === 0) {
        addOrUpdate(newMap, 1, value);
      } else if (key.toString().length % 2 === 0) {
        const leftNum = Number(key.toString().slice(0, key.toString().length / 2));
        const rightNum = Number(key.toString().slice(key.toString().length / 2));

        addOrUpdate(newMap, leftNum, value);
        addOrUpdate(newMap, rightNum, value);
      } else {
        addOrUpdate(newMap, key * 2024, value);
      }
    }
    map.clear();
    for (const [key, value] of newMap.entries()) {
      map.set(key, value);
    }
  }

  // console.log('FINAL', map.size, map.entries());
  let sum = 0;
  for (let [_, value] of map.entries()) {
    sum += value;
  }

  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `125 17`,
        expected: 55312,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `125 17`,
        expected: 65601038650482,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
