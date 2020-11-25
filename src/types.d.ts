import Block from './block';
import Keyboard from './keyboard';
import KeyEventController from './keyEventController';
import Logo from './logo';
import Matrix from './matrix';
import Next from './next';
import Point from './point';
import Speed from './speed';
import StartLines from './startLines';
import StateManager from './stateManager';


export namespace Tetris {
  export type Shape = Array<Array<number>>
  export type Dyx = Array<Array<number>>
  export type BlockShapes = { I: Shape, L: Shape, J: Shape, Z: Shape, S: Shape, O: Shape, T: Shape }
  export type YXRotateOrigin = { I: Dyx, L: Dyx, J: Dyx, Z: Dyx, S: Dyx, O: Dyx, T: Dyx }
  export type FillLine = number[]
  export type Line = number[]
  export type MatrixState = Line[]
  export type BlockType = 'I' | 'L' | 'J' | 'Z' | 'S' | 'O' | 'T'
  export type YX = [number, number]
  export interface BlockOption {
    type: BlockType;
    shape: Shape,
    rotateIndex: number;
    timeStamp: number;
    yx: YX;
  }
  export type Store = {
    states: {
      currentBlock: Block | null,
      nextBlock: Block | null,
      matrixState: MatrixState,
      speed: number,
      lock: boolean,
      startLines: number,
      point: number
    },
    matrix: Matrix,
    keyboard: Keyboard,
    stateManager: StateManager,
    keyEventController: KeyEventController ,
    logo: Logo,
    point: Point,
    next: Next,
    startLines: StartLines,
    speed: Speed
  }
  export interface KeyControl {
    keyDown: (type: KeyType) => void
    keyUp: (type: KeyType) => void
  }
  export type KeyCallback = {
    keyType: KeyType,
    callback?: () => void,
    once?: boolean
  }
  export interface KeyTimer {
    [keyType: string]: NodeJS.Timeout,
  }
  export type KeyType = 'arrowUp' | 'arrowRight' | 'arrowDown' | 'arrowLeft' | 'space';
}

declare global {
  interface Window {
    tetris: Tetris.Store
  }
}