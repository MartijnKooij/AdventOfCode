import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  // const monkeys = [
  //   {
  //     items: [79, 98],
  //     worryLevel: (item: number): number => {
  //       return Math.floor((item * 19) / 3);
  //     },
  //     nextMonkey: (item: number): number => {
  //       return item % 23 === 0 ? 2 : 3;
  //     },
  //     inspects: 0,
  //   },
  //   {
  //     items: [54, 65, 75, 74],
  //     worryLevel: (item: number): number => {
  //       return Math.floor((item + 6) / 3);
  //     },
  //     nextMonkey: (item: number): number => {
  //       return item % 19 === 0 ? 2 : 0;
  //     },
  //     inspects: 0,
  //   },
  //   {
  //     items: [79, 60, 97],
  //     worryLevel: (item: number): number => {
  //       return Math.floor((item * item) / 3);
  //     },
  //     nextMonkey: (item: number): number => {
  //       return item % 13 === 0 ? 1 : 3;
  //     },
  //     inspects: 0,
  //   },
  //   {
  //     items: [74],
  //     worryLevel: (item: number): number => {
  //       return Math.floor((item + 3) / 3);
  //     },
  //     nextMonkey: (item: number): number => {
  //       return item % 17 === 0 ? 0 : 1;
  //     },
  //     inspects: 0,
  //   },
  // ];
  const monkeys = [
    {
      items: [98, 89, 52],
      worryLevel: (item: number): number => Math.floor((item * 2) / 3),
      nextMonkey: (item: number): number => (item % 5 === 0 ? 6 : 1),
      inspects: 0,
    },
    {
      items: [57, 95, 80, 92, 57, 78],
      worryLevel: (item: number): number => Math.floor((item * 13) / 3),
      nextMonkey: (item: number): number => (item % 2 === 0 ? 2 : 6),
      inspects: 0,
    },
    {
      items: [82, 74, 97, 75, 51, 92, 83],
      worryLevel: (item: number): number => Math.floor((item + 5) / 3),
      nextMonkey: (item: number): number => (item % 19 === 0 ? 7 : 5),
      inspects: 0,
    },
    {
      items: [97, 88, 51, 68, 76],
      worryLevel: (item: number): number => Math.floor((item + 6) / 3),
      nextMonkey: (item: number): number => (item % 7 === 0 ? 0 : 4),
      inspects: 0,
    },
    {
      items: [63],
      worryLevel: (item: number): number => Math.floor((item + 1) / 3),
      nextMonkey: (item: number): number => (item % 17 === 0 ? 0 : 1),
      inspects: 0,
    },
    {
      items: [94, 91, 51, 63],
      worryLevel: (item: number): number => Math.floor((item + 4) / 3),
      nextMonkey: (item: number): number => (item % 13 === 0 ? 4 : 3),
      inspects: 0,
    },
    {
      items: [61, 54, 94, 71, 74, 68, 98, 83],
      worryLevel: (item: number): number => Math.floor((item + 2) / 3),
      nextMonkey: (item: number): number => (item % 3 === 0 ? 2 : 7),
      inspects: 0,
    },
    {
      items: [90, 56],
      worryLevel: (item: number): number => Math.floor((item * item) / 3),
      nextMonkey: (item: number): number => (item % 11 === 0 ? 3 : 5),
      inspects: 0,
    },
  ];

  for (let round = 0; round < 20; round++) {
    for (const monkey of monkeys) {
      while (true) {
        let worryLevel = monkey.items.shift();
        if (!worryLevel) {
          break;
        }
        // console.log('monkey', worryLevel, monkey.worryLevel(worryLevel), monkey.nextMonkey(monkey.worryLevel(worryLevel)));
        worryLevel = monkey.worryLevel(worryLevel);
        const newMonkey = monkey.nextMonkey(worryLevel);
        monkey.inspects++;
        monkeys[newMonkey].items.push(worryLevel);
      }
    }
  }

  monkeys.sort((a, b) =>
    a.inspects > b.inspects ? -1 : b.inspects > a.inspects ? 1 : 0
  );

  return monkeys[0].inspects * monkeys[1].inspects;
};

const part2 = (rawInput: string) => {
  // const monkeys = [
  //   {
  //     items: [79, 98],
  //     worryLevel: (item: number): number => (item * 19) % (23 * 19 * 13 * 17),
  //     nextMonkey: (item: number): number => (item % 23 === 0 ? 2 : 3),
  //     inspects: 0,
  //   },
  //   {
  //     items: [54, 65, 75, 74],
  //     worryLevel: (item: number): number => (item + 6) % (23 * 19 * 13 * 17),
  //     nextMonkey: (item: number): number => (item % 19 === 0 ? 2 : 0),
  //     inspects: 0,
  //   },
  //   {
  //     items: [79, 60, 97],
  //     worryLevel: (item: number): number => (item * item) % (23 * 19 * 13 * 17),
  //     nextMonkey: (item: number): number => (item % 13 === 0 ? 1 : 3),
  //     inspects: 0,
  //   },
  //   {
  //     items: [74],
  //     worryLevel: (item: number): number => (item + 3) % (23 * 19 * 13 * 17),
  //     nextMonkey: (item: number): number => (item % 17 === 0 ? 0 : 1),
  //     inspects: 0,
  //   },
  // ];

  const monkeys = [
    {
      items: [98, 89, 52],
      worryLevel: (item: number): number => (item * 2) % (5 * 2 * 19 * 7 * 17 * 13 * 3 * 11),
      nextMonkey: (item: number): number => item % 5 === 0 ? 6 : 1,
      inspects: 0,
    },
    {
      items: [57, 95, 80, 92, 57, 78],
      worryLevel: (item: number): number => (item * 13) % (5 * 2 * 19 * 7 * 17 * 13 * 3 * 11),
      nextMonkey: (item: number): number => item % 2 === 0 ? 2 : 6,
      inspects: 0,
    },
    {
      items: [82, 74, 97, 75, 51, 92, 83],
      worryLevel: (item: number): number => (item + 5) % (5 * 2 * 19 * 7 * 17 * 13 * 3 * 11),
      nextMonkey: (item: number): number => item % 19 === 0 ? 7 : 5,
      inspects: 0,
    },
    {
      items: [97, 88, 51, 68, 76],
      worryLevel: (item: number): number => (item + 6) % (5 * 2 * 19 * 7 * 17 * 13 * 3 * 11),
      nextMonkey: (item: number): number => item % 7 === 0 ? 0 : 4,
      inspects: 0,
    },
    {
      items: [63],
      worryLevel: (item: number): number => (item + 1) % (5 * 2 * 19 * 7 * 17 * 13 * 3 * 11),
      nextMonkey: (item: number): number => item % 17 === 0 ? 0 : 1,
      inspects: 0,
    },
    {
      items: [94, 91, 51, 63],
      worryLevel: (item: number): number => (item + 4) % (5 * 2 * 19 * 7 * 17 * 13 * 3 * 11),
      nextMonkey: (item: number): number => item % 13 === 0 ? 4 : 3,
      inspects: 0,
    },
    {
      items: [61, 54, 94, 71, 74, 68, 98, 83],
      worryLevel: (item: number): number => (item + 2) % (5 * 2 * 19 * 7 * 17 * 13 * 3 * 11),
      nextMonkey: (item: number): number => item % 3 === 0 ? 2 : 7,
      inspects: 0,
    },
    {
      items: [90, 56],
      worryLevel: (item: number): number => (item * item) % (5 * 2 * 19 * 7 * 17 * 13 * 3 * 11),
      nextMonkey: (item: number): number => item % 11 === 0 ? 3 : 5,
      inspects: 0,
    },
  ];

  for (let round = 0; round < 10000; round++) {
    for (const monkey of monkeys) {
      while (true) {
        let worryLevel = monkey.items.shift();
        if (!worryLevel) {
          break;
        }
        worryLevel = Math.floor(monkey.worryLevel(worryLevel));
        const newMonkey = monkey.nextMonkey(worryLevel);
        monkey.inspects++;
        monkeys[newMonkey].items.push(worryLevel);
      }
    }
  }

  monkeys.sort((a, b) =>
    a.inspects > b.inspects ? -1 : b.inspects > a.inspects ? 1 : 0
  );
  console.log("part 2", monkeys);

  return monkeys[0].inspects * monkeys[1].inspects;
};

run({
  part1: {
    tests: [
      {
        input: ``,
        expected: 10605,
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
