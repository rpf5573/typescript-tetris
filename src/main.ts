import './style.scss';
import Keyboard from './keyboard';
import { blankMatrix } from './const';
import Matrix from './matrix';
import { getNextBlock, resize } from './utils';
import StateManager from './stateManager';
import KeyEventController from './keyEventController';
import Logo from './logo'; 
import Point from './point';
import Next from './next';
import StartLines from './startLines';
import Speed from './speed';

resize();
window.addEventListener('resize', resize);
window.tetris = {
  states: {
    currentBlock: null, // 시작은 null로 둬야한다. 그래야, space를 눌렀을때 게임을 시작하는건지 block을 drop하는건지 알수있기 때문
    nextBlock: getNextBlock(),
    matrixState: blankMatrix,
    speed: 500,
    lock: false,
    startLines: 0,
    point: 0
  },
  matrix: new Matrix(),
  keyboard: new Keyboard(),
  stateManager: new StateManager(),
  keyEventController: new KeyEventController(),
  logo: new Logo(),
  point: new Point(),
  next: new Next(),
  startLines: new StartLines(),
  speed: new Speed()
}
window.tetris.stateManager.ready();