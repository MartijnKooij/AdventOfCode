"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Runner = void 0;
const read_input_1 = require("./read-input");
class Runner {
    constructor() {
        this.fishes = (0, read_input_1.readInput)('./input.txt');
    }
    execute() {
        // console.log('input', this.fishes, this.fishes.length);
        for (let day = 0; day < 80; day++) {
            const length = this.fishes.length;
            for (let f = 0; f < length; f++) {
                if (this.fishes[f] === 0) {
                    this.fishes[f] = 6;
                    this.fishes.push(8);
                }
                else {
                    this.fishes[f] = this.fishes[f] - 1;
                }
            }
            // console.log('day', this.fishes.length, day + 1, this.fishes.map((f) => f.timer));
        }
        console.log('answer', this.fishes.length);
    }
}
exports.Runner = Runner;
new Runner().execute();
