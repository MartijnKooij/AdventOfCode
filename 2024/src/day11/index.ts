import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput.split(' ').map(Number);
const addOrUpdate = (map: Map<number, number>, key: number) => {
  if (!map.has(key)) {
    map.set(key, 1);
  } else {
    map.set(key, map.get(key)! + 1);
  }
};
const removeOrUpdate = (map: Map<number, number>, key: number) => {
  if (map.get(key) === 1) {
    map.delete(key);
  } else {
    map.set(key, map.get(key)! - 1);
  }
};

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

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const map = new Map<number, number>();
  input.forEach(value => map.set(value, 1));

  for (let i = 0; i < 75; i++) {
    for (let [key] of map.entries()) {
      if (key === 0) {
        removeOrUpdate(map, key);
        addOrUpdate(map, 1);
      } else if (key.toString().length % 2 === 0) {
        const leftNum = Number(key.toString().slice(0, key.toString().length / 2));
        const rightNum = Number(key.toString().slice(key.toString().length / 2));

        addOrUpdate(map, leftNum);
        addOrUpdate(map, rightNum);
      } else {
        addOrUpdate(map, key * 2024);
      }

      removeOrUpdate(map, key);
    }
  }

  return input.length;
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
        expected: 55312,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
