import { readInput } from './read-input';

export class Runner {
  private crabs: number[];

  constructor() {
    this.crabs = readInput('./input.txt');
  }

  execute() {
    console.log('input', this.crabs, this.crabs.length);

    const median = (numbers: number[]) => {
      const middle = Math.floor(numbers.length / 2);
      numbers = [...numbers].sort((a, b) => a - b);
      return numbers.length % 2 !== 0 ? numbers[middle] : (numbers[middle - 1] + numbers[middle]) / 2;
    };

    const preferredX = median(this.crabs);
    const cost = this.crabs.reduce((p, c) => p + Math.abs(c - preferredX), 0);

    console.log('avg', preferredX, cost);
  }
}

new Runner().execute();
