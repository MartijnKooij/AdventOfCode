"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Runner = void 0;
const read_input_1 = require("./read-input");
class Runner {
    constructor() {
        this.fishes = (0, read_input_1.readInput)('./input.txt');
    }
    execute() {
        const ages = [
            this.fishes.filter(a => a === 0).length,
            this.fishes.filter(a => a === 1).length,
            this.fishes.filter(a => a === 2).length,
            this.fishes.filter(a => a === 3).length,
            this.fishes.filter(a => a === 4).length,
            this.fishes.filter(a => a === 5).length,
            this.fishes.filter(a => a === 6).length,
            this.fishes.filter(a => a === 7).length,
            this.fishes.filter(a => a === 8).length
        ];
        for (let day = 0; day < 256; day++) {
            const reproduced = ages.shift();
            ages[6] += reproduced;
            ages.push(reproduced);
        }
        console.log('ages', ages, ages.reduce((p, c) => p + c, 0));
    }
}
exports.Runner = Runner;
new Runner().execute();
