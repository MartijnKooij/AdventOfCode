"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const read_input_1 = require("../read-input");
const input = (0, read_input_1.readInput)();
let count = 0;
for (let index = 3; index < input.length + 3; index++) {
    const a = input[index - 3] + input[index - 2] + input[index - 1];
    const b = input[index - 2] + input[index - 1] + input[index - 0];
    if (a < b) {
        count++;
    }
}
console.log('The answer is', count);
