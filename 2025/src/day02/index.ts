import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput.split(',').map(range => {
  const [start, end] = range.split('-').map(Number);
  return { start, end };
});

const part1 = (rawInput: string) => {
  const ranges = parseInput(rawInput);
  let answer = 0;

  ranges.forEach(({ start, end }) => {
    for (let i = start; i <= end; i++) {
      if (i.toString().length % 2 !== 0) continue;

      const left = i.toString().substring(0, Math.floor(i.toString().length / 2));
      const right = i.toString().substring(Math.floor(i.toString().length / 2));

      if (left === right) {
        // console.log({ i, left, right });
        answer += i;
      }
    }
  });

  return answer;
};

const part2 = (rawInput: string) => {
  const ranges = parseInput(rawInput);
  let answer = 0;

  ranges.forEach(({ start, end }) => {
    for (let productId = start; productId <= end; productId++) {
      const productIdStr = productId.toString();
      let foundMatch = false;
      for (let idStart = 0; idStart < productIdStr.length; idStart++) {
        for (let idEnd = idStart + 1; idEnd <= productIdStr.length; idEnd++) {
          const substring = productIdStr.substring(idStart, idEnd);
          if (substring.length > productIdStr.length / 2) continue;
          const rest = productIdStr.replaceAll(substring, '');
          if (rest === '') {
            answer += productId;
            // console.log({ productId, substring, rest });
            foundMatch = true;
            break;
          }
          if (foundMatch) break;
        }
        if (foundMatch) break;
      }
    }
  });

  return answer;
};

run({
  part1: {
    tests: [
      {
        input: `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`,
        expected: 1227775554,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`,
        expected: 4174379265,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
