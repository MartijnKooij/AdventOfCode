"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Runner = void 0;
const read_input_1 = require("./read-input");
const lodash_1 = __importDefault(require("lodash"));
class Runner {
    constructor() {
        this.game = (0, read_input_1.readInput)('./input.txt');
    }
    execute() {
        for (let n = 0; n < this.game.numbers.length; n++) {
            const number = this.game.numbers[n];
            const foundBingo = this.checkNumberOnAllBoards(number);
            if (this.game.boards.length === 1 && foundBingo) {
                const sum = lodash_1.default.flattenDeep(this.game.boards[0].numbers)
                    .filter((v, i, a) => a.indexOf(v) === i)
                    .reduce((p, c) => p + c, 0);
                console.log('score', sum, number, sum * number);
                break;
            }
            this.game.boards = this.game.boards.filter((b) => !b.numbers.some((v) => v.length === 0));
            console.log('losing boards left', this.game.boards.length);
        }
    }
    checkNumberOnAllBoards(number) {
        let foundBingo;
        for (let b = 0; b < this.game.boards.length; b++) {
            const board = this.game.boards[b];
            if (this.checkBingo(board, number)) {
                foundBingo = true;
            }
        }
        return foundBingo;
    }
    checkBingo(board, number) {
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
exports.Runner = Runner;
new Runner().execute();
