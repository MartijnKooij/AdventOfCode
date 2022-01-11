import _ from 'lodash';
import { defaultSegments, Display, readInput } from './read-input';

export class Runner {
  private displays: Display[];

  constructor() {
    this.displays = readInput('./control.txt');
  }

  execute() {
    this.displays.forEach(display => {
      const oneSegments = display.segments.filter(s => s.length === defaultSegments[1].length).join();
      const segmentLines = [
        '',
        '',
        oneSegments[1],
        '',
        oneSegments[2],
        ''
      ];
      const sevenSegments = display.segments.filter(s => s.length === defaultSegments[7].length).join();
      

      console.log('debug', sevenSegments, segmentLines, this.linesToNumber(segmentLines));
    });
  }

  linesToNumber(lines: string[]): number {
    if (lines[0] && lines[2] && lines[4]) {
      return 7;
    }

    return -1;
  }
}

new Runner().execute();
