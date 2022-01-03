"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const read_input_1 = require("./read-input");
const input = (0, read_input_1.readInput)();
let count = 0;
for (let index = 1; index < input.length; index++) {
    if (input[index - 1] < input[index]) {
        count++;
    }
}
console.log('The answer is', count);
