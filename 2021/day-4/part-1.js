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
        console.log('game', JSON.stringify(this.game));
        for (let n = 0; n < this.game.numbers.length; n++) {
            const number = this.game.numbers[n];
            const sum = this.checkNumber(number);
            if (sum) {
                console.log('score', sum, number, sum * number);
                break;
            }
        }
    }
    checkNumber(number) {
        for (let b = 0; b < this.game.boards.length; b++) {
            const board = this.game.boards[b];
            if (this.hasBingo(board, number)) {
                const sum = lodash_1.default.flattenDeep(board.numbers)
                    .filter((v, i, a) => a.indexOf(v) === i)
                    .reduce((p, c) => p + c, 0);
                return sum;
            }
        }
    }
    hasBingo(board, number) {
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
exports.Runner = Runner;
new Runner().execute();
