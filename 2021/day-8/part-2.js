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
            const currentDisplaySegments = [
                display.segments.filter(s => s.length === read_input_1.defaultSegments[0].length).join(),
                display.segments.filter(s => s.length === read_input_1.defaultSegments[1].length).join(),
                display.segments.filter(s => s.length === read_input_1.defaultSegments[2].length).join(),
                display.segments.filter(s => s.length === read_input_1.defaultSegments[3].length).join(),
                display.segments.filter(s => s.length === read_input_1.defaultSegments[4].length).join(),
                display.segments.filter(s => s.length === read_input_1.defaultSegments[5].length).join(),
                display.segments.filter(s => s.length === read_input_1.defaultSegments[6].length).join(),
                display.segments.filter(s => s.length === read_input_1.defaultSegments[7].length).join(),
                display.segments.filter(s => s.length === read_input_1.defaultSegments[8].length).join(),
                display.segments.filter(s => s.length === read_input_1.defaultSegments[9].length).join()
            ];
            const wirePlacements = [
                '',
                '',
                '',
                '',
                '',
                '',
                ''
            ];
            // The top segment must be the only different one when comparing the 1 and the 7.
            wirePlacements[0] = currentDisplaySegments[7].replace(new RegExp(`[${currentDisplaySegments[1]}]`, 'gm'), '');
            // If you remove 7 and 4 from all 6 segment numbers (0,6,9) then 9 is the only one with 1 segment left and we know that's the bottom one.
            wirePlacements[6] = currentDisplaySegments[0].replace(new RegExp(`[${currentDisplaySegments[4]}${currentDisplaySegments[7]}]`, 'gm'), '').split(',').filter(s => s.length === 1).join();
            // If you remove 7 and the bottom segment from all 5 segment numbers (2,3,5) then 3 is the only one with 1 segment left and we know that's the middle one.
            wirePlacements[3] = currentDisplaySegments[2].replace(new RegExp(`[${currentDisplaySegments[7]}${wirePlacements[6]}]`, 'gm'), '').split(',').filter(s => s.length === 1).join();
            // If we know the middle segment and the 1 and remove those from 4 than the top left segment remains.
            wirePlacements[1] = currentDisplaySegments[4].replace(new RegExp(`[${currentDisplaySegments[1]}${wirePlacements[3]}]`, 'gm'), '').split(',').filter(s => s.length === 1).join();
            // We now how 4 of the 5 segments that make up the 5 (and only 3 of the segments that make up the 2 and 3) so we can determine the bottom right one.
            wirePlacements[5] = currentDisplaySegments[5].replace(new RegExp(`[${wirePlacements[0]}${wirePlacements[1]}${wirePlacements[3]}${wirePlacements[6]}]`, 'gm'), '').split(',').filter(s => s.length === 1).join();
            // Now we know the bottom right one so we know the other one in the 1 is the top right one.
            wirePlacements[2] = currentDisplaySegments[1].replace(new RegExp(`[${wirePlacements[5]}]`, 'gm'), '').split(',').filter(s => s.length === 1).join();
            // Bottom left is now the one remaining difference between what we have (9) and the 8.
            wirePlacements[4] = currentDisplaySegments[8].replace(new RegExp(`[${wirePlacements.join()}]`, 'gm'), '').split(',').filter(s => s.length === 1).join();
            let answer = '';
            display.output.forEach(output => {
                answer += this.linesToNumber;
            });
            console.log('debug', currentDisplaySegments, wirePlacements, this.linesToNumber(wirePlacements));
        });
    }
    linesToNumber(lines) {
        if (lines[0] && lines[1] && lines[2] && lines[3] && lines[4] && lines[5] && lines[6]) {
            return 8;
        }
        if (lines[0] && lines[1] && lines[2] && lines[4] && lines[5] && lines[6]) {
            return 0;
        }
        if (lines[0] && lines[1] && lines[3] && lines[4] && lines[5] && lines[6]) {
            return 6;
        }
        if (lines[0] && lines[1] && lines[2] && lines[3] && lines[5] && lines[6]) {
            return 9;
        }
        if (lines[0] && lines[2] && lines[3] && lines[4] && lines[6]) {
            return 2;
        }
        if (lines[0] && lines[2] && lines[3] && lines[5] && lines[6]) {
            return 3;
        }
        if (lines[0] && lines[1] && lines[3] && lines[5] && lines[6]) {
            return 5;
        }
        if (lines[1] && lines[2] && lines[3] && lines[5]) {
            return 4;
        }
        if (lines[0] && lines[2] && lines[5]) {
            return 7;
        }
        if (lines[2] && lines[5]) {
            return 1;
        }
        return -1;
    }
}
exports.Runner = Runner;
new Runner().execute();
