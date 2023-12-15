import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput.replaceAll('\n', '').split(',');

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let currentValue = 0;
  let sum = 0;

  input.forEach(key => {
    currentValue = hash(currentValue, key);
    sum += currentValue;
  });

  return sum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const boxes: Array<Map<string, number>> = Array.from({length: 256}, () => new Map<string, number>());
  let boxIndex = 0;

  input.forEach(key => {
    boxIndex = 0;
    let label = '';
    let focus = '';
    if (key.includes('=')) {
      [label, focus] = key.split('=');
      boxIndex = hash(boxIndex, label);
      // console.log('=', label, focus, boxIndex);  
      boxes[boxIndex].set(label, Number(focus));
    } else {
      [label, focus] = key.split('-');
      boxIndex = hash(boxIndex, label);
      // console.log('-', label, boxIndex);  
      boxes[boxIndex].delete(label);
    }
  });
  // console.table(boxes.filter(b => b.size > 0).map(b => Array.from(b.entries())));
  let sum = 0;
  boxes.forEach((b, bi) => {
    Array.from(b.entries()).forEach(([k,v], i) => {
      sum += (bi+1) * (i+1) * v;
      // console.log((bi+1) * (i+1) * v);
    });
  });

  return sum;
};

function hash(currentValue: number, key: string) {
  currentValue = 0;
  for (let c = 0; c < key.length; c++) {
    currentValue = ((currentValue + key.charCodeAt(c)) * 17) % 256;
  }
  return currentValue;
}

run({
  part1: {
    tests: [
      {
        input: `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`,
        expected: 1320,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`,
        expected: 145,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
