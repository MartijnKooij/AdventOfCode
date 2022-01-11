"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Runner = void 0;
const read_input_1 = require("./read-input");
class Runner {
    constructor() {
        this.displays = (0, read_input_1.readInput)('./control.txt');
    }
    execute() {
        this.displays.forEach(display => {
            const oneSegments = display.segments.filter(s => s.length === read_input_1.defaultSegments[1].length).join();
            const segmentLines = [
                '',
                '',
                oneSegments[1],
                '',
                oneSegments[2],
                ''
            ];
            const sevenSegments = display.segments.filter(s => s.length === read_input_1.defaultSegments[7].length).join();
            console.log('debug', sevenSegments, segmentLines, this.linesToNumber(segmentLines));
        });
    }
    linesToNumber(lines) {
        if (lines[0] && lines[2] && lines[4]) {
            return 7;
        }
        return -1;
    }
}
exports.Runner = Runner;
new Runner().execute();
