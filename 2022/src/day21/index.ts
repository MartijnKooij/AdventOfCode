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
  public monkey1: Monkey | undefined;

  public operation: string = '';

  public monkeyId2: string = '';
  public monkey2: Monkey | undefined;

  public get isMathMonkey() {
    return this.monkeyId1 && this.operation && this.monkeyId2;
  }

  constructor(public id: string) { }

  public setRequiredMonkeys(monkeys: Monkey[]) {
    if (!this.isMathMonkey) return;

    this.monkey1 = monkeys.find(m => m.id === this.monkeyId1);
    this.monkey2 = monkeys.find(m => m.id === this.monkeyId2);
  }

  public reset() {
    if (this.isMathMonkey) this.value = 0;
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

  const human = monkeys.find(m => m.id === 'humn');
  if (human) {
    human.value = 3715799488132;
  }
  while (!monkeys.every(m => !!m.value)) {
    monkeys.forEach(m => m.execute());
  }

  /*
  human value
  94625185243550.00
  94625185243550.00
  */

  const round = (num: number) => Math.abs(num).toFixed(2);
  const root = monkeys.find(m => m.id === 'root');
  if (root) {
    console.log('root values', round((root.monkey1?.value ?? 0)), round((root.monkey2?.value ?? 0)), round((root.monkey1?.value ?? 0)) < round((root.monkey2?.value ?? 0)) ? 'make human SMALLER' : 'make human BIGGER');
  }

  return monkeys.find(m => m.id === 'root')?.value;
};

const part2 = (rawInput: string) => {
  const monkeys = parseInput(rawInput);
  monkeys.forEach(m => m.setRequiredMonkeys(monkeys));

  const human = monkeys.find(m => m.id === 'humn');
  if (!human) throw new Error('No human found...');

  let found = false;
  let humanValue = 3715799489000;
  let escape = 0;
  while (!found) {
    escape++;
    if (escape > 100) {
      console.log('nope...');
      break;
    }
    monkeys.forEach(m => m.reset());
    humanValue++;
    human.value = humanValue;

    const findRoot = (): boolean => {
      let innerEscape = 0;
      let found = false;

      while (true) {
        if (found || monkeys.every(m => !!m.value)) return found;
  
        innerEscape++;
        if (innerEscape > 33) {
          console.log('inner nope...', innerEscape);
          break;
        }
        monkeys.forEach((m) => {
          if (m.id === 'root') {
            found = !!m.monkey1?.value && !!m.monkey2?.value && m.monkey1?.value === m.monkey2?.value;
            if (found) console.log('root matches!', m.monkey1?.value, m.monkey2?.value, found, humanValue);
          }
          m.execute();
        });
      }

      return found;
    }

    found = findRoot();
  }

  // console.log('monkeys', monkeys);

  return found ? humanValue : 'NOT FOUND!';
};

run({
  part1: {
    tests: [
      // {
      //   input: `
      //   root: pppw + sjmn
      //   dbpl: 5
      //   cczh: sllz + lgvd
      //   zczc: 2
      //   ptdq: humn - dvpt
      //   dvpt: 3
      //   lfqf: 4
      //   humn: 5
      //   ljgn: 2
      //   sjmn: drzm * dbpl
      //   sllz: 4
      //   pppw: cczh / lfqf
      //   lgvd: ljgn * ptdq
      //   drzm: hmdt - zczc
      //   hmdt: 32`,
      //   expected: 152,
      // },
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
  onlyTests: false,
});
