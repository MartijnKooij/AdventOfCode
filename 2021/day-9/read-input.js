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
exports.readInput = exports.Node = void 0;
const fs = __importStar(require("fs"));
class Node {
    constructor(value) {
        this.adjacentValues = [];
        this.value = value;
    }
}
exports.Node = Node;
function readInput(fileName = './input.txt') {
    const data = fs.readFileSync(fileName).toString();
    const nodes = [];
    const lines = data.split('\r\n');
    for (let l = 0; l < lines.length; l++) {
        const line = lines[l];
        for (let c = 0; c < line.length; c++) {
            const node = new Node(parseInt(line[c]));
            if (c > 0)
                node.adjacentValues.push(parseInt(line[c - 1]));
            if (c < line.length - 1)
                node.adjacentValues.push(parseInt(line[c + 1]));
            if (l > 0)
                node.adjacentValues.push(parseInt(lines[l - 1][c]));
            if (l < lines.length - 1)
                node.adjacentValues.push(parseInt(lines[l + 1][c]));
            nodes.push(node);
        }
    }
    return nodes;
}
exports.readInput = readInput;
