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
        const median = (arr) => {
            const middle = Math.floor(arr.length / 2);
            arr = [...arr].sort((a, b) => a - b);
            return arr.length % 2 !== 0 ? arr[middle] : (arr[middle - 1] + arr[middle]) / 2;
        };
        const preferredX = median(this.crabs);
        const cost = this.crabs.reduce((p, c) => p + Math.abs(c - preferredX), 0);
        console.log('avg', preferredX, cost);
    }
}
exports.Runner = Runner;
new Runner().execute();
