import _ from 'lodash';
import { defaultSegments, Display, readInput } from './read-input';

export class Runner {
  private displays: Display[];

  constructor() {
    this.displays = readInput('./input.txt');
  }

  execute() {
    console.log('input', this.displays);
  }
}

new Runner().execute();
