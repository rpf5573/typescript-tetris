import { tryMove } from '../utils';
import { Tetris } from '../types';

export default class ArrowLeft implements Tetris.KeyControl {
  type: Tetris.KeyType = 'arrowLeft';
  constructor() {  }
  blockLeft = () => {
    const gs = window.tetris.states;
    if (gs.lock === true) {return}
    if (gs.currentBlock == null) {return}
    const matrix = window.tetris.matrix;
    const nextBlock = gs.currentBlock.left();
    // 갈수있으면 가고, 못가면 어쩔 수 없고
    if (tryMove(gs.matrixState, nextBlock)) {
      const nextMatrixState = matrix.addBlock(gs.matrixState, nextBlock);
      matrix.render(nextMatrixState);
      gs.currentBlock = nextBlock;
    }
  }
  decreaseStartLines = () => {
    window.tetris.startLines.updateStartLines(-1);
  }
  keyDown = () => {
    const tetris = window.tetris;
    tetris.keyEventController.down({
      keyType: this.type,
      callback: (tetris.states.currentBlock != null ) ? this.blockLeft : this.decreaseStartLines,
      once: (tetris.states.currentBlock != null ) ? false : true,
    });
  }
  keyUp = () => {
    window.tetris.keyEventController.up({
      keyType: this.type,
      callback: null
    });
  }
}