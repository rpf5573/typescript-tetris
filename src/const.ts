import { Tetris } from "./types";

const width: number = 744;
const height: number = 932; 
const blockShapes: Tetris.BlockShapes = {
  I: [
    [1, 1, 1, 1],
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
  ],
  O: [
    [1, 1],
    [1, 1],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
  ],
};
enum blockTypes { I = 'I', L = 'L', J = 'J', Z = 'Z', S = 'S', O = 'O', T = 'T' }
const yxRotateOrigin: Tetris.YXRotateOrigin = {
  I: [
    [-1, 1],
    [1, -1]
  ],
  L: [
    [0, 0]
  ],
  J: [
    [0, 0]
  ],
  Z: [
    [0, 0]
  ],
  S: [
    [0, 0]
  ],
  O: [
    [0, 0]
  ],
  T: [
    [0, 0],
    [1, 0],
    [-1, 1],
    [0, -1]
  ],
};
const yxStartPosition: {[key: string]: Tetris.YX} = {
  I: [0, 3],
  L: [-1, 4],
  J: [-1, 4],
  Z: [-1, 4],
  S: [-1, 4],
  O: [-1, 4],
  T: [-1, 4],
}
const speeds: number[] = [800, 650, 500, 370, 250, 160];
const delays: number[] = [50, 60, 70, 80, 90, 100];
const fillLine: Tetris.FillLine = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
const blankLine: Tetris.Line = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const blankMatrix: Tetris.MatrixState = (() => {
  const matrixState: Tetris.MatrixState = [];
  for (let i = 0; i < 20; i++) { matrixState.push([...blankLine]); }
  return matrixState;
})();
const clearPoints: number[] = [100, 300, 700, 1500];
const StorageKey: string = 'REACT_TETRIS';
const maxPoint: number = 999999;
const eachLines: number = 20;
const keyCodeWithType: {[key: number]: Tetris.KeyType;} = {
  37: 'arrowLeft', 38: 'arrowUp', 39: 'arrowRight', 40: 'arrowDown',
  32: 'space',
}
const keyCodes = Object.keys(keyCodeWithType).map(e => parseInt(e, 10));
const LAST_ROUND = 'Last Round';
const POINT = 'Point';

export {
  width, height, LAST_ROUND, POINT,
  blockShapes, yxRotateOrigin, blockTypes, speeds, yxStartPosition,
  delays, fillLine, blankLine, blankMatrix, clearPoints,
  StorageKey, maxPoint, eachLines, keyCodeWithType, keyCodes
}