"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Runner = void 0;
const read_input_1 = require("./read-input");
class Runner {
    constructor() {
        this.displays = (0, read_input_1.readInput)('./input.txt');
    }
    execute() {
        console.log('input', this.displays);
    }
}
exports.Runner = Runner;
new Runner().execute();
