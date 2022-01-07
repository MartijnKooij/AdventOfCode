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
exports.readInput = void 0;
const fs = __importStar(require("fs"));
const board_1 = require("./board");
const game_1 = require("./game");
function readInput(fileName = './input.txt') {
    const data = fs.readFileSync(fileName).toString().replace(/ {2}/g, ' ');
    const lines = data.split('\r\n');
    const game = new game_1.Game();
    game.numbers = lines[0].split(',').map(n => parseInt(n, 10));
    let b = 0;
    for (let l = 2; l < lines.length; l += 6) {
        game.boards[b] = new board_1.Board();
        const line1 = lines[l].split(' ').filter(n => !!n).map(n => parseInt(n.trim(), 10));
        const line2 = lines[l + 1].split(' ').filter(n => !!n).map(n => parseInt(n.trim(), 10));
        const line3 = lines[l + 2].split(' ').filter(n => !!n).map(n => parseInt(n.trim(), 10));
        const line4 = lines[l + 3].split(' ').filter(n => !!n).map(n => parseInt(n.trim(), 10));
        const line5 = lines[l + 4].split(' ').filter(n => !!n).map(n => parseInt(n.trim(), 10));
        const rows = [line1, line2, line3, line4, line5];
        console.log('rows', rows);
        for (let x = 0; x < 5; x++) {
            game.boards[b].numbers[x] = [];
            for (let y = 0; y < 5; y++) {
                game.boards[b].numbers[x].push(rows[y][x]);
            }
        }
        game.boards[b].numbers[5] = line1;
        game.boards[b].numbers[6] = line2;
        game.boards[b].numbers[7] = line3;
        game.boards[b].numbers[8] = line4;
        game.boards[b].numbers[9] = line5;
        b++;
    }
    return game;
}
exports.readInput = readInput;
