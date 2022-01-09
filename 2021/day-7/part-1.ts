import { readInput } from './read-input';

export class Runner {
  private crabs: number[];

  constructor() {
    this.crabs = readInput('./input.txt');
  }

  execute() {
    console.log('input', this.crabs, this.crabs.length);

    const median = (arr: number[]) => {
      const middle = Math.floor(arr.length / 2);
        arr = [...arr].sort((a, b) => a - b);
      return arr.length % 2 !== 0 ? arr[middle] : (arr[middle - 1] + arr[middle]) / 2;
    };

    const preferredX = median(this.crabs);
    const cost = this.crabs.reduce((p, c) => p + Math.abs(c - preferredX), 0);

    console.log('avg', preferredX, cost);
  }
}

new Runner().execute();
