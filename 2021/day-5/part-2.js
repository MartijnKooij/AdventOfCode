"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Runner = void 0;
const read_input_1 = require("./read-input");
class Runner {
    constructor() {
        this.input = (0, read_input_1.readInput)('./input.txt');
    }
    execute() {
        // console.log('input', this.input, this.input.length);
        const lines = new Map();
        this.input.forEach(line => {
            if (line.x1 === line.x2) {
                const startY = Math.min(line.y1, line.y2);
                const lengthY = Math.max(line.y1, line.y2) + 1;
                for (let y = startY; y < lengthY; y++) {
                    lines.set(`${line.x1},${y}`, (lines.get(`${line.x1},${y}`) ?? 0) + 1);
                }
            }
            else if (line.y1 === line.y2) {
                const startX = Math.min(line.x1, line.x2);
                const lengthX = Math.max(line.x1, line.x2) + 1;
                for (let x = startX; x < lengthX; x++) {
                    lines.set(`${x},${line.y1}`, (lines.get(`${x},${line.y1}`) ?? 0) + 1);
                }
            }
            else {
                const diffX = line.x1 < line.x2 ? 1 : -1;
                const diffY = line.y1 < line.y2 ? 1 : -1;
                const length = Math.abs(line.x1 - line.x2) + 1;
                for (let step = 0; step < length; step++) {
                    const x = line.x1 + step * diffX;
                    const y = line.y1 + step * diffY;
                    lines.set(`${x},${y}`, (lines.get(`${x},${y}`) ?? 0) + 1);
                }
            }
        });
        console.log('answer', Array.from(lines).filter((value) => value[1] >= 2).length);
    }
}
exports.Runner = Runner;
new Runner().execute();
