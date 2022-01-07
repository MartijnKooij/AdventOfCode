import { Line, readInput } from './read-input';

export class Runner {
  private input: Line[];

  constructor() {
    this.input = readInput('./input.txt');
  }

  execute() {
    console.log('input', this.input, this.input.length);

    const lines = new Map();

    this.input.forEach(line => {
      if (line.x1 === line.x2) {
        const startY = Math.min(line.y1, line.y2);
        const lengthY = Math.max(line.y1, line.y2) + 1;
        for (let y = startY; y < lengthY; y++) {
          lines.set(`${line.x1},${y}`, (lines.get(`${line.x1},${y}`) ?? 0) + 1);
        }
      } else if (line.y1 === line.y2) {
        const startX = Math.min(line.x1, line.x2);
        const lengthX = Math.max(line.x1, line.x2) + 1;
        for (let x = startX; x < lengthX; x++) {
          lines.set(`${x},${line.y1}`, (lines.get(`${x},${line.y1}`) ?? 0) + 1);
        }
      }
    });

    console.log('lines', Array.from(lines).length);
    console.log('answer', Array.from(lines).filter((value) => value[1] >= 2).length);
  }
}

new Runner().execute();