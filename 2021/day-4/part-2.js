"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const read_input_1 = require("./read-input");
const input = (0, read_input_1.readInput)('./input.txt');
let inputO2 = [...input];
let inputCO2 = [...input];
const power = {
    o2: [],
    co2: []
};
for (let b = 0; b < input[0].length; b++) {
    const o21count = inputO2.filter((i) => i[b] === '1').length;
    const o20count = inputO2.filter((i) => i[b] === '0').length;
    const co21count = inputCO2.filter((i) => i[b] === '1').length;
    const co20count = inputCO2.filter((i) => i[b] === '0').length;
    console.log('debug', co21count, co20count, inputCO2);
    power.o2[b] = o21count >= o20count ? '1' : '0';
    power.co2[b] = co21count < co20count ? '1' : '0';
    inputO2 = inputO2.length > 1 ? inputO2.filter((i) => i[b] === power.o2[b]) : inputO2;
    inputCO2 = inputCO2.length > 1 ? inputCO2.filter((i) => i[b] === power.co2[b]) : inputCO2;
}
console.log('debug', power.o2.join(''), power.co2.join(''));
console.log('debug', inputO2.join(''), inputCO2.join(''));
console.log('The answer is', parseInt(inputO2.join(''), 2) * parseInt(inputCO2.join(''), 2));
