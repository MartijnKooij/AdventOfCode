import { Board } from './board';
import { readInput } from './read-input';
import _ from 'lodash';
import { Game } from './game';

export class Runner {
  private game: Game;

  constructor() {
    this.game = readInput('./input.txt');
  }

  execute() {
    console.log('game', JSON.stringify(this.game));

    for (let n = 0; n < this.game.numbers.length; n++) {
      const number = this.game.numbers[n];
      const sum = this.checkNumber(number)

      if (sum) {
        console.log('score', sum, number, sum * number);

        break;
      }
    }
  }

  private checkNumber(number: number) {
    for (let b = 0; b < this.game.boards.length; b++) {
      const board = this.game.boards[b];

      if (this.hasBingo(board, number)) {
        const sum = _.flattenDeep(board.numbers)
          .filter((v, i, a) => a.indexOf(v) === i)
          .reduce((p, c) => p + c, 0);
        
          return sum;
      }
    }
  }

  private hasBingo(board: Board, number: number): boolean {
    let hasBingo = false;
  
    for (let row = 0; row < board.numbers.length; row++) {
      board.numbers[row] = board.numbers[row].filter((rowNumber) => rowNumber !== number);

      if (board.numbers[row].length === 0) {
        console.log('winner', JSON.stringify(board));

        hasBingo = true;
      }
    }

    return hasBingo;
  }
}

new Runner().execute();