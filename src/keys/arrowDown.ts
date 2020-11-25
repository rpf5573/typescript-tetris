import { tryMove } from '../utils';
import Matrix from '../matrix';
import { Tetris } from '../types';

export default class ArrowDown implements Tetris.KeyControl {
  type: Tetris.KeyType = 'arrowDown';
  constructor() {  }
  blockDown = () => {
    const gs = window.tetris.states;
    if (gs.currentBlock == null) {return}
    const nextBlock = gs.currentBlock.fall();
    const matrix = window.tetris.matrix;
    // 갈수있으면 가고, 못가면 어쩔 수 없고
    if (tryMove(gs.matrixState, nextBlock)) {
      const nextMatrixState = matrix.addBlock(gs.matrixState, nextBlock);
      matrix.render(nextMatrixState);
      gs.currentBlock = nextBlock;
    }
  }
  decreaseSpeed = () => {
    window.tetris.speed.updateSpeed(-100);
  }
  keyDown = () => {
    const tetris = window.tetris;
    window.tetris.keyEventController.down({
      keyType: this.type,
      callback: (tetris.states.currentBlock != null ) ? this.blockDown : this.decreaseSpeed,
      once: (tetris.states.currentBlock != null ) ? false : true,
    });
  }
  keyUp = () => {
    if (window.tetris.states.lock === true) {return}
    window.tetris.keyEventController.up({
      keyType: this.type,
      callback: null
    });
  }
}