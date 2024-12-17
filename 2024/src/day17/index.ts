import run from 'aocrunner';

type OpCode = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
type RegisterType = 'A' | 'B' | 'C';
type Register = Record<RegisterType, number>;
const getOperandValue = (operand: number, register: Register): number => {
  if (operand <= 3) return operand;
  if (operand === 4) return register.A;
  if (operand === 5) return register.B;
  if (operand === 6) return register.C;

  throw new Error(`Invalid operand: ${operand}`);
}
const operations: Record<OpCode, (register: Register, operand: number) => void> = {
  0: (register, operand) => register.A = register.A / Math.pow(2, getOperandValue(operand, register)),
  1: (register, operand) => register.B = register.B ^ getOperandValue(operand, register),
  2: (register, operand) => register.B = getOperandValue(operand, register) % 8,
  3: (register, operand) => ,
  4: (register, operand) => ,
  5: (register, operand) => ,
  6: (register, operand) => ,
  7: (register, operand) => 
}
const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
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
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
