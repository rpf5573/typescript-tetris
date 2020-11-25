import Block from './block';
import { blankLine } from './const';
import { Tetris } from './types';
import { deepCopy, tryMove } from './utils';

class Matrix {
  matrixNode: HTMLDivElement;
  count: number = 0;
  timer: NodeJS.Timeout;
  constructor() {
    this.matrixNode = document.querySelector(".game-screen > .matrix > .inner");
  }
  removeChildren = (parentNode: HTMLDivElement) => {
    let child: ChildNode = null;
    while(child = parentNode.lastChild) { parentNode.removeChild(child); }
  }
  autoDown = () => {
    const gs = window.tetris.states;
    const stateManager = window.tetris.stateManager;
    const fall = () => {
      if (gs.lock == true) { return }
      let currentBlock = gs.currentBlock;
      const nextBlock = currentBlock.fall();
      if (tryMove(gs.matrixState, nextBlock)) {
        this.render(this.addBlock(gs.matrixState, nextBlock)); // 핵심은 여기서 update 된 matrix를 gameState.matrixState 에 넣지 않는다는거~
        gs.currentBlock = nextBlock;
        this.timer = setTimeout(fall, gs.speed);
      } else {
        // 다음 블럭이 못가면, 현재 블럭을 matrixState에 고정(?) 시킨다
        gs.matrixState = this.addBlock(gs.matrixState, currentBlock);
        stateManager.nextAround();
      }
    }
    clearTimeout(this.timer);
    this.timer = setTimeout(fall, gs.speed);
  }
  addBlock = (matrixState: Tetris.MatrixState, block: Block): Tetris.MatrixState => {
    const {yx, shape} = block;
    const newMatrixState = deepCopy(matrixState);
    shape.forEach((line, i) => {
      line.forEach((blockState, j) => {
        const y = yx[0]+i;
        const x = yx[1]+j;
        if (y < 0 || y >= 20 || x < 0 || x >= 10) { return }
        if (blockState == 1) {
          if (newMatrixState[y][x] == 0) { newMatrixState[y][x] = 1; }
        }
      });
    });
    return newMatrixState;
  }
  clearLines = (lines: number[], callback:(point:number) => void) => {
    const stateManager = window.tetris.stateManager;
    stateManager.lock(); // 잠그고
    this.animateLines(lines, () => {
      let newMatrix = deepCopy(window.tetris.states.matrixState);
      lines.forEach(n => {
        newMatrix.splice(n, 1);
        newMatrix.unshift(blankLine);
      });
      window.tetris.states.matrixState = newMatrix;
      this.render();
      callback(lines.length * 50);
      stateManager.unlock(); // 풀어준다
      stateManager.nextAround();
    });
  }
  animateLines = (lines: number[], callback:()=>void) => {
    this.render(this.setLine(lines, 2));
    setTimeout(() => {
      this.render(this.setLine(lines, 0));
      setTimeout(() => {
        this.render(this.setLine(lines, 2));
        setTimeout(() => {
          this.render(this.setLine(lines, 0));
          callback();
        }, 150);
      }, 150);
    }, 150);
  }
  setLine = (lines: number[], blockState: number) => {
    const gs = window.tetris.states;
    const matrix = deepCopy(gs.matrixState);
    lines.forEach(i => {
      const newLine = Array(10).fill(blockState);
      matrix[i] = newLine;
    });
    return matrix;
  }
  reset = (callback?: () => void) => {
    const tetris = window.tetris;
    const gs = tetris.states;
    const matrix = tetris.matrix;
    const animateLine = (index: number) => {
      const len = 10
      if (index < 20) {
        const i = 20 - (index + 1)
        gs.matrixState[i] = Array(len).fill(1);
        matrix.render();
      } else if (index < 40) {
        const i = index - 20;
        gs.matrixState[i] = Array(len).fill(0);
        matrix.render();
      }
      // 마지막에 index가 40이라면, 즉 다 끝났다면!
      else {
        if (callback) { callback(); }
      }
    }
    for (let i = 0; i <= 40; i++) {
      setTimeout(animateLine.bind(null, i), 40 * (i+1));
    }
  }
  render = (matrixState?: Tetris.MatrixState) => {
    if (matrixState == undefined) { matrixState = window.tetris.states.matrixState; }
    this.removeChildren(this.matrixNode); // 비우고 시작하자
    matrixState.forEach((line: Tetris.Line) => {
      const lineNode = document.createElement("div");
      lineNode.className = 'line';
      line.forEach(blockState => {
        const blockNode = document.createElement("div");
        blockNode.className = 'b';
        if (blockState === 1) { blockNode.classList.add("active"); }
        else if (blockState === 2) { blockNode.classList.add("blink"); }
        lineNode.appendChild(blockNode);
      });
      this.matrixNode.appendChild(lineNode);
    });
  }
}

export default Matrix