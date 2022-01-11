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
exports.readInput = exports.Display = exports.defaultSegments = void 0;
const fs = __importStar(require("fs"));
exports.defaultSegments = [
    'abcefg',
    'cf',
    'acdeg',
    'acdfg',
    'bcdf',
    'abdfg',
    'abdefg',
    'acf',
    'abcdefg',
    'abcdfg', // 9
];
class Display {
    constructor() {
        this.segments = [];
        this.output = [];
    }
}
exports.Display = Display;
function readInput(fileName = './input.txt') {
    const data = fs.readFileSync(fileName).toString();
    return data.split('\r\n').map((line) => {
        const parts = line.split(' | ');
        return {
            segments: parts[0].split(' '),
            output: parts[1].split(' ')
        };
    });
}
exports.readInput = readInput;
