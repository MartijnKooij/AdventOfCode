import { readInput } from './read-input';

export class Runner {
  private input;

  constructor() {
    this.input = readInput('./control.txt');
  }

  execute() {
    //
  }
}

new Runner().execute();