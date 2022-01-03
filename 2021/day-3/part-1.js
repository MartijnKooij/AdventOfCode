"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const read_input_1 = require("./read-input");
const input = (0, read_input_1.readInput)();
const power = {
    gamma: [],
    epsilon: [],
};
for (let b = 0; b < 12; b++) {
    const gamma1count = input.filter(i => i[b] === '1').length;
    const gamma0count = input.filter(i => i[b] === '0').length;
    const epsilon1count = input.filter(i => i[b] === '1').length;
    const epsilon0count = input.filter(i => i[b] === '0').length;
    power.gamma[b] = gamma1count >= gamma0count ? '1' : '0';
    power.epsilon[b] = epsilon1count <= epsilon0count ? '1' : '0';
}
console.log('debug', power.gamma.join(''), power.epsilon.join(''));
console.log('The answer is', parseInt(power.gamma.join(''), 2) * parseInt(power.epsilon.join(''), 2));
