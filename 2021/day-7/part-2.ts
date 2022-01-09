import { readInput } from './read-input';

export class Runner {
  private crabs: number[];

  constructor() {
    this.crabs = readInput('./input.txt');
  }

  execute() {
    console.log('input', this.crabs, this.crabs.length);
  }
}

new Runner().execute();
