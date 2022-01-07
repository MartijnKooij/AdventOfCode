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
    for (let n = 0; n < this.game.numbers.length; n++) {
      const number = this.game.numbers[n];

      const foundBingo = this.checkNumberOnAllBoards(number);

      if (this.game.boards.length === 1 && foundBingo) {
        const sum = _.flattenDeep(this.game.boards[0].numbers)
          .filter((v, i, a) => a.indexOf(v) === i)
          .reduce((p, c) => p + c, 0);

        console.log('score', sum, number, sum * number);

        break;
      }

      this.game.boards = this.game.boards.filter((b) => !b.numbers.some((v) => v.length === 0));
      console.log('losing boards left', this.game.boards.length);
    }
  }

  private checkNumberOnAllBoards(number: number) {
    let foundBingo;

    for (let b = 0; b < this.game.boards.length; b++) {
      const board = this.game.boards[b];

      if (this.checkBingo(board, number)) {
        foundBingo = true;
      }
    }

    return foundBingo;
  }

  private checkBingo(board: Board, number: number): boolean {
    let hasBingo = false;

    for (let row = 0; row < board.numbers.length; row++) {
      board.numbers[row] = board.numbers[row].filter((rowNumber) => rowNumber !== number);

      if (board.numbers[row].length === 0) {
        hasBingo = true;
      }
    }

    if (hasBingo) {
      console.log('winner', JSON.stringify(board));
    }

    return hasBingo;
  }
}

new Runner().execute();
