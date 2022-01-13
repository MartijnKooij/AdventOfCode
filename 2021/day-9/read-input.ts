import * as fs from 'fs';

export class Node {
  value: number;
  adjacentValues = [] as number[];

  constructor(value: number) {
    this.value = value;
  }
}

export function readInput(fileName = './input.txt'): Node[] {
  const data = fs.readFileSync(fileName).toString();

  const nodes = [] as Node[];
  
  const lines = data.split('\r\n');
  for (let l = 0; l < lines.length; l++) {
    const line = lines[l];
    for (let c = 0; c < line.length; c++) {
      const node = new Node(parseInt(line[c]));
      if (c > 0) node.adjacentValues.push(parseInt(line[c - 1]));
      if (c < line.length - 1) node.adjacentValues.push(parseInt(line[c + 1]));
      if (l > 0) node.adjacentValues.push(parseInt(lines[l - 1][c]));
      if (l < lines.length - 1) node.adjacentValues.push(parseInt(lines[l + 1][c]));

      nodes.push(node);
    } 
  }

  return nodes;
}
