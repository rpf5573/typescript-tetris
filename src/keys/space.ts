import { Tetris } from '../types';
import { tryMove } from '../utils';

export default class Space implements Tetris.KeyControl {
  type: Tetris.KeyType = 'space';
  constructor() {  }
  drop = () => {
    const gs = window.tetris.states;
    if (gs.lock === true) {return}
    if (gs.currentBlock == null) {return}
    const stateManager = window.tetris.stateManager;
    const matrix = window.tetris.matrix;
    let bottom = gs.currentBlock;
    for(var n = 1; n < 20; n++) {
      bottom = gs.currentBlock.fall(n);
      if (tryMove(gs.matrixState, bottom) == false) {
        bottom = gs.currentBlock.fall(n-1);
        break
      }
    }
    gs.currentBlock = bottom;
    gs.matrixState = matrix.addBlock(gs.matrixState, gs.currentBlock);
    matrix.render(gs.matrixState);
    stateManager.nextAround();
  }
  keyDown = () => {
    const tetris = window.tetris;
    tetris.keyEventController.down({
      keyType: this.type,
      callback: (tetris.states.currentBlock != null ) ? this.drop : tetris.stateManager.start,
      once: true
    });
  }
  keyUp = () => {
    const tetris = window.tetris;
    tetris.keyEventController.up({
      keyType: this.type,
      callback: null
    });
  }
}