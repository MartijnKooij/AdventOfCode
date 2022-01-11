"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Runner = void 0;
const read_input_1 = require("./read-input");
class Runner {
    constructor() {
        this.crabs = (0, read_input_1.readInput)('./input.txt');
    }
    execute() {
        console.log('input', this.crabs, this.crabs.length);
        const median = (numbers) => {
            const middle = Math.floor(numbers.length / 2);
            numbers = [...numbers].sort((a, b) => a - b);
            return numbers.length % 2 !== 0 ? numbers[middle] : (numbers[middle - 1] + numbers[middle]) / 2;
        };
        const preferredX = median(this.crabs);
        const cost = this.crabs.reduce((p, c) => p + Math.abs(c - preferredX), 0);
        console.log('avg', preferredX, cost);
    }
}
exports.Runner = Runner;
new Runner().execute();
