import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput.split('\n');

const part1 = (rawInput: string) => {
    const input = parseInput(rawInput);
    const max = 99;
    let s = 50;
    let answer = 0;

    input.forEach(l => {
        let n = Number(l.substring(1));
        if (n > max + 1) n = n % (max + 1);

        if (l[0] === 'L') s -= n;
        if (l[0] === 'R') s += n;

        if (s < 0) s = max - Math.abs(s) + 1;
        if (s > max) s = s - max - 1;

        if (s === 0) answer += 1;
    });

    return answer;
};

const part2 = (rawInput: string) => {
    const input = parseInput(rawInput);
    const max = 99;
    let s = 50;
    let answer = 0;

    input.forEach(l => {
        let n = Number(l.substring(1));
        if (n > max + 1) {
            answer += Math.floor(n / (max + 1));
            n = n % (max + 1);
        }

        const prevS = s;

        if (l[0] === 'L') s -= n;
        if (l[0] === 'R') s += n;

        if (s < 0) {
            if (prevS !== 0 && max - Math.abs(s) + 1 !== 0) answer += 1;
            s = max - Math.abs(s) + 1;
        }
        if (s > max) {
            if (prevS !== 0 && s - max - 1 !== 0) answer += 1;
            s = s - max - 1;
        }

        if (s === 0) answer += 1;
    });

    return answer;

};

run({
    part1: {
        tests: [
            {
                input: `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82
`,
                expected: 3,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82
`,
                expected: 6,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
});
