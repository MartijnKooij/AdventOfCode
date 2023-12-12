import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput.split('\n').map(l => {
  const p = l.split(' ');
  return { 
    springs: p[0].split(''),
    placements: p[1].split(',').map(Number).sort((a, b) => b - a) }
});

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  input.forEach(row => {
    console.log('row', row.springs, row.placements);
    console.log('count', countSolutions(row.springs, row.placements));
  });

  return 0;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

function countSolutions(springs: string[], placements: number[]): number {
  let count = 0;
  const possibleSprings: string[] = [];

  function place(springs: string[], placements: number[], index: number): void {
    if (placements.length === 0) {
      if (possibleSprings.includes(springs.join(''))) {
        return;
      }
      possibleSprings.push(springs.join(''));
      count++;
      return;
    }

    for (let i = 0; i < placements.length; i++) {
      if (canPlace(springs, index, placements[i])) {
        let newSprings = [...springs];
        for (let j = index; j < index + placements[i]; j++) {
          newSprings[j] = '#';
        }

        let newPlacements = [...placements];
        newPlacements.splice(i, 1);

        place(newSprings, newPlacements, index + placements[i] + 1);
      }
    }
  }

  place(springs, placements, 0);

  return count;
}

function canPlace(springs: string[], index: number, size: number): boolean {
  if (index + size > springs.length) {
    return false;
  }

  for (let i = index; i < index + size; i++) {
    if (springs[i] !== '?') {
      return false;
    }
  }

  if (index > 0 && springs[index - 1] === '#') {
    return false;
  }
  if (index + size < springs.length && springs[index + size] === '#') {
    return false;
  }

  return true;
}

run({
  part1: {
    tests: [
      {
        input: `
        ???.### 1,1,3
        .??..??...?##. 1,1,3
        ?#?#?#?#?#?#?#? 1,3,1,6
        ????.#...#... 4,1,1
        ????.######..#####. 1,6,5
        ?###???????? 3,2,1`,
        expected: 21,
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
