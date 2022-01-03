import { readInput } from './read-input';

const input = readInput();
const location = {
  position: 0,
  depth: 0,
};

input.forEach((i) => {
  switch (i.operation) {
    case 'forward':
      location.position += i.count;
      break;
    case 'down':
      location.depth += i.count;
      break;
    case 'up':
      location.depth -= i.count;
      break;
    default:
      break;
  }
});

console.log('The answer is', location.position * location.depth);
