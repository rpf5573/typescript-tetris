import Matrix from '../matrix';
import { Tetris } from '../types';
import { tryMove } from '../utils';

export default class ArrowUp implements Tetris.KeyControl {
  type: Tetris.KeyType = 'arrowUp';
  constructor() {  }
  blockUp = () => {
    const gs = window.tetris.states
    if (gs.lock === true) {return}
    if (gs.currentBlock == null) {return}
    const matrix = window.tetris.matrix;
    const nextBlock = gs.currentBlock.rotate();
    if (tryMove(gs.matrixState, nextBlock)) {
      const nextMatrixState = matrix.addBlock(gs.matrixState, nextBlock);
      matrix.render(nextMatrixState);
      gs.currentBlock = nextBlock;
    }
  }
  increaseSpeed = () => {
    window.tetris.speed.updateSpeed(100);
  }
  keyDown = () => {
    const tetris = window.tetris;
    window.tetris.keyEventController.down({
      keyType: this.type,
      callback: (tetris.states.currentBlock != null ) ? this.blockUp : this.increaseSpeed,
      once: true
    });
  }
  keyUp = () => {
    window.tetris.keyEventController.up({
      keyType: this.type,
      callback: null
    });
  }
}