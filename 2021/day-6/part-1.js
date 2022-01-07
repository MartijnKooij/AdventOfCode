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
                if (this.fishes[f].timer === 0) {
                    this.fishes[f].timer = 6;
                    this.fishes.push(new read_input_1.Fish(8));
                }
                else {
                    this.fishes[f].timer = this.fishes[f].timer - 1;
                }
            }
            ;
        }
        console.log('answer', this.fishes.length, this.fishes);
    }
}
exports.Runner = Runner;
new Runner().execute();
