"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Runner = void 0;
const read_input_1 = require("./read-input");
class Runner {
    constructor() {
        this.nodes = (0, read_input_1.readInput)('./input.txt');
    }
    execute() {
        console.log('input', this.nodes);
        const lowPoints = [];
        for (let n = 0; n < this.nodes.length; n++) {
            const node = this.nodes[n];
            if (node.adjacentValues.every(a => a > node.value)) {
                lowPoints.push(node.value);
            }
        }
        const risk = lowPoints.reduce((c, p) => (c + 1) + p, 0);
        console.log(lowPoints, risk);
    }
}
exports.Runner = Runner;
new Runner().execute();
