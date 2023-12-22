import run from 'aocrunner';
import * as THREE from 'three';
import * as fs from 'fs';
import { createCanvas } from 'canvas';
import gl from 'gl';
import * as pngjs from 'pngjs';
import jsdom from 'jsdom';

const { JSDOM } = jsdom;
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.document = dom.window.document;

const parseInput = (rawInput: string) => {
  return rawInput.split('\n').map(l => {
    const pairs = l.split('~');
    const points = pairs.map(pair => {
      const [x, y, z] = pair.split(',').map(Number);
      return { x, y, z };
    });

    return createBrick(points);
  });
};

const part1 = (rawInput: string) => {
  const bricks = parseInput(rawInput);

  renderBricks(bricks);

  return;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

function renderBricks(bricks: THREE.Mesh[]) {
  const width = 800, height = 600;
  const context = gl(width, height, { preserveDrawingBuffer: true });

  const renderer = new THREE.WebGLRenderer({ context });
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  bricks.forEach(brick => scene.add(brick));

  const camera = new THREE.PerspectiveCamera(10, width / height, 1, 100);
  camera.position.set(0, 0, 100);
  camera.lookAt(0, 0, 1);

  renderer.render(scene, camera);
  savePicture(width, height, context, './bricks_front.png');

  camera.position.set(100, 0, 0);
  camera.lookAt(1, 0, 0);

  renderer.render(scene, camera);
  savePicture(width, height, context, './bricks_side.png');

  camera.position.set(0, 100, 0);
  camera.lookAt(0, 1, 0);

  renderer.render(scene, camera);
  savePicture(width, height, context, './bricks_top.png');
}

function savePicture(width: number, height: number, context: WebGLRenderingContext & gl.StackGLExtension, fileName: string) {
  const pixels = new Uint8Array(width * height * 4);
  context.readPixels(0, 0, width, height, context.RGBA, context.UNSIGNED_BYTE, pixels);

  var png = new pngjs.PNG({
    width: width,
    height: height,
    filterType: -1
  });

  for (var i = 0; i < pixels.length; i++) {
    png.data[i] = pixels[i];
  }

  png.pack().pipe(fs.createWriteStream(fileName));
}

function createBrick([start, end]: { x: number, y: number, z: number }[]): THREE.Mesh {
  const { x: startX, y: startY, z: startZ } = start;
  const { x: endX, y: endY, z: endZ } = end;

  const width = endX - startX + 1;
  const height = endY - startY + 1;
  const depth = endZ - startZ + 1;

  console.log('geo', width, height, depth);

  const geometry = new THREE.BoxGeometry(width, height, depth);
  const material = new THREE.MeshBasicMaterial({ color: getRandomColor() });
  const brick = new THREE.Mesh(geometry, material);

  brick.position.set((startX + endX) / 2, (startY + endY) / 2, (startZ + endZ) / 2);

  return brick;
}

function getRandomColor(): string {
  const getRandomHex = (): string => {
      const hex = Math.floor(Math.random() * 256).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${getRandomHex()}${getRandomHex()}${getRandomHex()}`;
}

run({
  part1: {
    tests: [
      {
        input: `
        1,0,1~1,2,1
        0,0,2~2,0,2
        0,2,3~2,2,3
        0,0,4~0,2,4
        2,0,5~2,2,5
        0,1,6~2,1,6
        1,1,8~1,1,9
        `,
        expected: "",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
