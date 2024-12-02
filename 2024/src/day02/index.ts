import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput.split("\n").map((line) => line.split(" ").map(Number));

const testReport = (report: number[], retry = false, log = false) => {
  let allSafe = true;
  let direction = 0;

  for (let i = 0; i < report.length - 1; i++) {
    const diff = report[i + 1] - report[i];
    if (Math.abs(diff) > 3 || diff === 0) {
      if (retry) {
        report.splice(i, 1);
        return testReport(report, false);
      }
      allSafe = false;
      break;
    }
    if (diff > 0) {
      if (direction < 0) {
        if (retry) {
          report.splice(i, 1);
          return testReport(report, false);
        }
        allSafe = false;
        break;
      }
      direction = 1;
    } else if (diff < 0) {
      if (direction > 0) {
        if (retry) {
          report.splice(i, 1);
          return testReport(report, false);
        }
        allSafe = false;
        break;
      }
      direction = -1;
    }
  }

  if (allSafe) {
    if (log) {
      // console.log('safe?', report);
    }
    return true;
  }
  if (log) {
    console.log('unsafe?', report);
  }
  return false;
};

const part1 = (rawInput: string) => {
  const reports = parseInput(rawInput);
  let safeReports = 0;
  for (const report of reports) {
    if (testReport(report)) {
      safeReports++;
    }
  }

  return safeReports;
};

const part2 = (rawInput: string) => {
  const reports = parseInput(rawInput);
  let safeReports = 0;
  for (const report of reports) {
    if (testReport(report, true, true)) {
      safeReports++;
    }
  }

  return safeReports;
};

run({
  part1: {
    tests: [
      {
        input: `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
