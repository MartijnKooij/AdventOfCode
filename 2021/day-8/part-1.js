"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Runner = void 0;
const lodash_1 = __importDefault(require("lodash"));
const read_input_1 = require("./read-input");
class Runner {
    constructor() {
        this.displays = (0, read_input_1.readInput)('./input.txt');
    }
    execute() {
        console.log('input', this.displays);
        const uniqueSegmentLengths = [read_input_1.defaultSegments[1].length, read_input_1.defaultSegments[4].length, read_input_1.defaultSegments[7].length, read_input_1.defaultSegments[8].length];
        const count = lodash_1.default.flattenDeep(this.displays.map(d => d.output.filter(o => uniqueSegmentLengths.some(u => u == o.length)))).length;
        console.log('answer', count);
    }
}
exports.Runner = Runner;
new Runner().execute();
