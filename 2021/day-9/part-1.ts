import _ from 'lodash';
import { readInput, Node } from './read-input';

export class Runner {
  private nodes: Node[];

  constructor() {
    this.nodes = readInput('./input.txt');
  }

  execute() {
    console.log('input', this.nodes);

    const lowPoints = [] as number[];
    for (let n = 0; n < this.nodes.length; n++) {
      const node = this.nodes[n];
      if (node.adjacentValues.every(a => a > node.value)) {
        lowPoints.push(node.value);
      }
    }

    const risk = lowPoints.reduce((c, p) => (c + 1) + p, 0);
    console.log(lowPoints, risk);
  }
}

new Runner().execute();
