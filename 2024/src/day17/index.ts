import run from 'aocrunner';

type OpCode = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
type RegisterType = 'A' | 'B' | 'C';
type Register = Record<RegisterType, number>;

const output: number[] = [];
const getOperandValue = (operand: number, register: Register): number => {
  if (operand <= 3) return operand;
  if (operand === 4) return register.A;
  if (operand === 5) return register.B;
  if (operand === 6) return register.C;
  if (operand === 7) return 7;

  throw new Error(`Invalid operand: ${operand}`);
}
const operations: Record<OpCode, (instruction: number, register: Register, operand: number) => number> = {
  0: (instruction, register, operand) => { register.A = Math.trunc(register.A / Math.pow(2, getOperandValue(operand, register))); return instruction + 2; },
  1: (instruction, register, operand) => { register.B = register.B ^ getOperandValue(operand, register); return instruction + 2; },
  2: (instruction, register, operand) => { register.B = getOperandValue(operand, register) % 8; return instruction + 2; },
  3: (instruction, register, operand) => register.A === 0 ? instruction + 2 : getOperandValue(operand, register),
  4: (instruction, register, operand) => { register.B = register.B ^ register.C; return instruction + 2; },
  5: (instruction, register, operand) => { output.push(getOperandValue(operand, register) % 8); return instruction + 2; },
  6: (instruction, register, operand) => { register.B = Math.trunc(register.A / Math.pow(2, getOperandValue(operand, register))); return instruction + 2; },
  7: (instruction, register, operand) => { register.C = Math.trunc(register.A / Math.pow(2, getOperandValue(operand, register))); return instruction + 2; },
}
const parseInput = (rawInput: string) => {
  const [registers, program] = rawInput.split('\n\n');
  const register = registers.split('\n').reduce((acc, line) => {
    const [reg, value] = line.split(': ');
    acc[reg.replace('Register ', '') as RegisterType] = parseInt(value);
    return acc;
  }, {} as Register);

  return {
    register,
    program: program.replace('Program: ', '').split(',').map(Number)
  };
};

const part1 = (rawInput: string) => {
  const app = parseInput(rawInput);
  // const app = {
  //   register: { A: 0, B: 29, C: 0 },
  //   program: [1, 7]
  // };
  let instruction = 0;
  output.length = 0;
  while (true) {
    const opcode = app.program[instruction];
    const operand = app.program[instruction + 1];
    // console.log('INSTRUCTION', instruction, opcode, operand);
    instruction = operations[opcode as OpCode](instruction, app.register, operand);
    // console.log('RESULT', app.register, instruction);
    if (instruction >= app.program.length) break;
  }

  return output.join(',');
};

const part2 = (rawInput: string) => {
  const app = parseInput(rawInput);
  // const app = {
  //   register: { A: 0, B: 29, C: 0 },
  //   program: [1, 7]
  // };
  const find = app.program.join(',');
  let a = 0;
  while (true) {
    const newApp = {
      register: { A: a, B: app.register.B, C: app.register.C },
      program: app.program
    };

    let instruction = 0;
    output.length = 0;
    while (true) {
      const opcode = newApp.program[instruction];
      const operand = newApp.program[instruction + 1];
      // console.log('INSTRUCTION', instruction, opcode, operand);
      instruction = operations[opcode as OpCode](instruction, newApp.register, operand);
      // console.log('RESULT', newApp.register, instruction);
      if (instruction >= newApp.program.length) break;
    }

    if (output.join(',') === find) return a;
    a++;
    console.log('not yet found...', a);
  }
  return 'Not found';
};

run({
  part1: {
    tests: [
      {
        input: `Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0
`,
        expected: "4,6,3,5,6,3,5,2,1,0",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Register A: 2024
Register B: 0
Register C: 0

Program: 0,3,5,4,3,0
`,
        expected: 117440,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
