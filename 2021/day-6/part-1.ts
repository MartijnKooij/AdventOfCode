import { Fish, readInput } from './read-input';

export class Runner {
  private fishes: Fish[];

  constructor() {
    this.fishes = readInput('./input.txt');
  }

  execute() {
    // console.log('input', this.fishes, this.fishes.length);

    for (let day = 0; day < 80; day++) {
      const length = this.fishes.length;

      for (let f = 0; f < length; f++) {
        if (this.fishes[f].timer === 0) {
          this.fishes[f].timer = 6;
          this.fishes.push(new Fish(8));
        } else {
          this.fishes[f].timer = this.fishes[f].timer - 1;
        }
      }

      // console.log('day', this.fishes.length, day + 1, this.fishes.map((f) => f.timer)
      );
    }

    console.log('answer', this.fishes.length, this.fishes);
  }
}

new Runner().execute();
