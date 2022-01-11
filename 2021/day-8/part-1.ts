import _ from 'lodash';
import { defaultSegments, Display, readInput } from './read-input';

export class Runner {
  private displays: Display[];

  constructor() {
    this.displays = readInput('./input.txt');
  }

  execute() {
    console.log('input', this.displays);
    const uniqueSegmentLengths = [defaultSegments[1].length,defaultSegments[4].length,defaultSegments[7].length,defaultSegments[8].length];

    const count = _.flattenDeep(this.displays.map(d => d.output.filter(o => uniqueSegmentLengths.some(u => u == o.length)))).length;

    console.log('answer', count);
  }
}

new Runner().execute();
