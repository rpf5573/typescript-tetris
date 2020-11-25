import {getNextBlock, deepCopy, getClearLines, isOver, getStartMatrix} from './utils';
import {blankMatrix, LAST_ROUND, POINT} from './const';

class StateManager {
  constructor() {}
  ready = (callback?:() => void) => {
    this.lock();
    const tetris = window.tetris;
    const matrix = tetris.matrix;
    clearTimeout(matrix.timer);
    matrix.render(deepCopy(blankMatrix));

    tetris.states.currentBlock = null;
    if (tetris.states.nextBlock == null) { tetris.states.nextBlock = getNextBlock(); }
    tetris.next.reset(); // next를 지우고

    const lastPoint = Number(localStorage.getItem('last-point'));
    if ( lastPoint > 0 ) {
      tetris.point.changeTitle(LAST_ROUND);
      tetris.point.render(lastPoint); // 그리기만 하고 넣지는 말자
    }
    tetris.logo.show(); // logo 보이기 + animation까지
    tetris.logo.animate();
    tetris.startLines.render(tetris.states.startLines);
    tetris.speed.render(tetris.states.speed);
    this.unlock();
    if (callback) {callback()}
  }
  lock = () => {
    const gs = window.tetris.states;
    gs.lock = true;
  }
  unlock = () => {
    const gs = window.tetris.states;
    gs.lock = false;
  }
  start = () => {
    const tetris = window.tetris;
    tetris.logo.hide();
    tetris.point.reset(POINT); // 포인트 리셋해야지
    setTimeout(() => {
      const gs = window.tetris.states;
      gs.matrixState = getStartMatrix(gs.startLines);
      gs.currentBlock = gs.nextBlock;
      gs.nextBlock = getNextBlock(); // deep copy를 안했는데 이게 문제가 될까?
      tetris.next.render(gs.nextBlock);
      const matrix = window.tetris.matrix;
      matrix.render(); // startLine 먼저 그리자
      setTimeout(() => {
        matrix.render(matrix.addBlock(gs.matrixState, gs.currentBlock));
        setTimeout(() => {
          matrix.autoDown();
        }, 500);
      }, 500);
    }, 300);
  }
  reset = () => {
    this.lock();
    const tetris = window.tetris;
    tetris.states.currentBlock = null;
    tetris.states.nextBlock = null;
    tetris.matrix.reset(() => {
      this.ready(this.unlock);
    });
  }
  gameOver = () => {
    this.lock();
    const tetris = window.tetris;
    const point = tetris.states.point;
    tetris.keyEventController.clearEventAll(); // 이전에 막 화살표를 누른게 있을수도 있으니까 지워준다.
    localStorage.setItem('last-point', `${point}`);
    tetris.matrix.reset(() => {
      setTimeout(() => {
        this.ready(this.unlock);
      }, 500);
    });
  }
  nextAround = () => {
    const tetris = window.tetris;
    const gs = tetris.states;
    const matrix = tetris.matrix;
    clearTimeout(matrix.timer);
    const lines = getClearLines();
    if (lines.length > 0) {
      matrix.clearLines(lines, (point:number) => {
        tetris.point.updatePoint(point); // clear한다음에 점수도 주자
      });
      return
    }
    if (isOver()) {
      this.gameOver();
      return
    }
    setTimeout(() => {
      gs.currentBlock = gs.nextBlock;
      gs.nextBlock = getNextBlock(); // deep copy를 안했는데 이게 문제가 될까?
      tetris.next.render(gs.nextBlock);
      matrix.render(matrix.addBlock(gs.matrixState, gs.currentBlock));
      matrix.autoDown();
    }, 100);
  }
}

export default StateManager