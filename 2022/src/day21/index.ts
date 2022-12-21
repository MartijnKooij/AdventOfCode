import run from 'aocrunner';

const operators: { [id: string]: (a: number, b: number) => number } = {
  '+': (a: number, b: number): number => a + b,
  '-': (a: number, b: number): number => a - b,
  '/': (a: number, b: number): number => a / b,
  '*': (a: number, b: number): number => a * b,
};

class Monkey {
  public value: number = 0;
  public monkeyId1: string = '';
  public operation: string = '';
  public monkeyId2: string = '';

  private monkey1: Monkey | undefined;
  private monkey2: Monkey | undefined;

  public get isMathMonkey() {
    return this.monkeyId1 && this.operation && this.monkeyId2;
  }

  constructor(public id: string) { }

  public setRequiredMonkeys(monkeys: Monkey[]) {
    if (!this.isMathMonkey) return;

    this.monkey1 = monkeys.find(m => m.id === this.monkeyId1);
    this.monkey2 = monkeys.find(m => m.id === this.monkeyId2);
  }

  public execute(): boolean {
    if (!this.monkey1?.value) return false;
    if (!this.monkey2?.value) return false;

    this.value = operators[this.operation](this.monkey1.value, this.monkey2.value);
    return true;
  }
}

const parseInput = (rawInput: string): Monkey[] => rawInput.split('\n').map((l) => {
  // root: pppw + sjmn
  const values = l.split(':');
  const monkey = new Monkey(values[0]);
  const data = values[1].trim().split(' ');

  if (data.length === 1) {
    monkey.value = Number(data[0]);
  } else {
    monkey.monkeyId1 = data[0];
    monkey.operation = data[1];
    monkey.monkeyId2 = data[2];
  }

  return monkey;
});

const part1 = (rawInput: string) => {
  const monkeys = parseInput(rawInput);
  monkeys.forEach(m => m.setRequiredMonkeys(monkeys));

  while (!monkeys.every(m => !!m.value)) {
    monkeys.forEach(m => m.execute());
  }

  return monkeys.find(m => m.id === 'root')?.value;
};

const part2 = (rawInput: string) => {
  const monkeys = parseInput(rawInput);
  monkeys.forEach(m => m.setRequiredMonkeys(monkeys));

  while (!monkeys.every(m => !!m.value)) {
    monkeys.forEach((m) => {
      if (m.id === 'root')
      m.execute();
    });
  }

  return monkeys.find(m => m.id === 'root')?.value;
};

run({
  part1: {
    tests: [
      {
        input: `
        root: pppw + sjmn
        dbpl: 5
        cczh: sllz + lgvd
        zczc: 2
        ptdq: humn - dvpt
        dvpt: 3
        lfqf: 4
        humn: 5
        ljgn: 2
        sjmn: drzm * dbpl
        sllz: 4
        pppw: cczh / lfqf
        lgvd: ljgn * ptdq
        drzm: hmdt - zczc
        hmdt: 32`,
        expected: 152,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        root: pppw + sjmn
        dbpl: 5
        cczh: sllz + lgvd
        zczc: 2
        ptdq: humn - dvpt
        dvpt: 3
        lfqf: 4
        humn: 5
        ljgn: 2
        sjmn: drzm * dbpl
        sllz: 4
        pppw: cczh / lfqf
        lgvd: ljgn * ptdq
        drzm: hmdt - zczc
        hmdt: 32`,
        expected: 301,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
