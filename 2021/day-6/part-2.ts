import { readInput } from './read-input';

export class Runner {
  private fishes: number[];

  constructor() {
    this.fishes = readInput('./input.txt');
  }

  execute() {
    const ages = [
      this.fishes.filter(a => a === 0).length,
      this.fishes.filter(a => a === 1).length,
      this.fishes.filter(a => a === 2).length,
      this.fishes.filter(a => a === 3).length,
      this.fishes.filter(a => a === 4).length,
      this.fishes.filter(a => a === 5).length,
      this.fishes.filter(a => a === 6).length,
      this.fishes.filter(a => a === 7).length,
      this.fishes.filter(a => a === 8).length
    ];

    for (let day = 0; day < 256; day++) {
        const reproduced = ages.shift() as number;

        ages[6] += reproduced;

        ages.push(reproduced);
    }

    console.log('ages', ages, ages.reduce((p, c) => p + c, 0));
  }
}

new Runner().execute();
