import * as fs from 'fs';

export class Fish {
  timer: number;

  constructor(timer: number) {
    this.timer = timer;
  }
}
export function readInput(fileName = './input.txt'): Fish[] {
  const data = fs.readFileSync(fileName).toString();
  
  return data.split(',').filter(v => !!v).map(v => new Fish(parseInt(v, 10)));
}
