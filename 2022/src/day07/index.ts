import run from 'aocrunner';

class Node {
  parentNode: Node | undefined;
  size: number = 0;
  name: string = '';
  type: 'file' | 'folder' = 'folder';
  childNodes: Node[] = [];

  constructor(parent: Node | undefined, name: string, type: 'file' | 'folder', size: number) {
    this.parentNode = parent;
    this.name = name;
    this.type = type;
    this.size = size;
  }

  getSize = (): number => {
    return this.size + this.childNodes.reduce((p, c) => p + c.getSize(), 0);
  }
}
const parseInput = (rawInput: string) => rawInput.split('\n');

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const rootNode = new Node(undefined, '/', 'folder', 0);
  let currentNode: Node | undefined = rootNode;

  input.forEach(command => {
    if (command === '$ cd /') {
      currentNode = rootNode;
    } else if (command === '$ cd ..') {
      currentNode = currentNode?.parentNode;
    } else if (command.startsWith('$ cd ')) {
      const dir = command.replace('$ cd ', '');
      currentNode = currentNode?.childNodes.find(n => n.type === 'folder' && n.name === dir);
    } else if (command == '$ ls') {
      // No action
    } else if (command.startsWith('dir')) {
      const dir = command.replace('dir ', '');
      currentNode?.childNodes.push(new Node(currentNode, dir, 'folder', 0));
    } else {
      const file = command.split(' ');
      currentNode?.childNodes.push(new Node(currentNode, file[1], 'file', parseInt(file[0], 10)));
    }
  });

  return sumSizes(rootNode);
};

const sumSizes = (node: Node, size: number = 0): number => {
  if (node.type === 'folder' && node.getSize() <= 100000) {
    size += node.getSize();
  }
  node.childNodes.filter(n => n.type === 'folder').forEach(child => {
    size = sumSizes(child, size);
  });

  return size;
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const rootNode = new Node(undefined, '/', 'folder', 0);
  let currentNode: Node | undefined = rootNode;

  input.forEach(command => {
    if (command === '$ cd /') {
      currentNode = rootNode;
    } else if (command === '$ cd ..') {
      currentNode = currentNode?.parentNode;
    } else if (command.startsWith('$ cd ')) {
      const dir = command.replace('$ cd ', '');
      currentNode = currentNode?.childNodes.find(n => n.type === 'folder' && n.name === dir);
    } else if (command == '$ ls') {
      // No action
    } else if (command.startsWith('dir')) {
      const dir = command.replace('dir ', '');
      currentNode?.childNodes.push(new Node(currentNode, dir, 'folder', 0));
    } else {
      const file = command.split(' ');
      currentNode?.childNodes.push(new Node(currentNode, file[1], 'file', parseInt(file[0], 10)));
    }
  });

  const sizeNeeded = Math.abs(70000000 - rootNode.getSize() - 30000000);
  return bestSize(rootNode, Number.MAX_VALUE, sizeNeeded);
};

const bestSize = (node: Node, bestSizeFound: number, sizeNeeded: number) => {
  const size = node.getSize();

  if (size < bestSizeFound && size >= sizeNeeded) {
    bestSizeFound = size;
  }

  node.childNodes.filter(n => n.type === 'folder').forEach(child => {
    bestSizeFound = bestSize(child, bestSizeFound, sizeNeeded);
  });

  return bestSizeFound;
}

run({
  part1: {
    tests: [
      {
        input: `
        $ cd /
        $ ls
        dir a
        14848514 b.txt
        8504156 c.dat
        dir d
        $ cd a
        $ ls
        dir e
        29116 f
        2557 g
        62596 h.lst
        $ cd e
        $ ls
        584 i
        $ cd ..
        $ cd ..
        $ cd d
        $ ls
        4060174 j
        8033020 d.log
        5626152 d.ext
        7214296 k`,
        expected: 95437,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        $ cd /
        $ ls
        dir a
        14848514 b.txt
        8504156 c.dat
        dir d
        $ cd a
        $ ls
        dir e
        29116 f
        2557 g
        62596 h.lst
        $ cd e
        $ ls
        584 i
        $ cd ..
        $ cd ..
        $ cd d
        $ ls
        4060174 j
        8033020 d.log
        5626152 d.ext
        7214296 k`,
        expected: 24933642,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
