import _ from 'lodash';
import { readInput, Node } from './read-input';

export class Runner {
  private nodes: Node[];

  constructor() {
    this.nodes = readInput('./input.txt');
  }

  execute() {
    console.log('input', this.nodes);
  }
}

new Runner().execute();
