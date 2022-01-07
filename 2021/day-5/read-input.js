"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readInput = exports.Line = void 0;
const fs = __importStar(require("fs"));
class Line {
    constructor() {
        this.x1 = 0;
        this.y1 = 0;
        this.x2 = 0;
        this.y2 = 0;
    }
}
exports.Line = Line;
function readInput(fileName = './input.txt') {
    const data = fs.readFileSync(fileName).toString();
    const lines = data.split('\r\n');
    let points = lines.filter(l => !!l).map(line => {
        const values = [...line.matchAll(/(\d+),(\d+) -> (\d+),(\d+)$/g)];
        // console.log('processing', values);
        return {
            x1: parseInt(values[0][1], 10),
            y1: parseInt(values[0][2], 10),
            x2: parseInt(values[0][3], 10),
            y2: parseInt(values[0][4], 10)
        };
    });
    // For part 1 only
    points = points.filter(p => p.x1 === p.x2 || p.y1 === p.y2);
    return points;
}
exports.readInput = readInput;
