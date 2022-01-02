import { readInput } from '../read-input';

const input = readInput();
let count = 0;

for (let index = 1; index < input.length; index++) {
    if (input[index - 1] < input[index]) {
        count ++;
    }
}

console.log('The answer is', count);