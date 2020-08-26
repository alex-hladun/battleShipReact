import {Socket} from "socket.io-client"

export interface State {
  gameState: GameState,
  viewState: ViewState
}



export interface ViewState{
  view: string,
  gameOver: boolean
}

export interface GameState {
  boardSize: number;
  difficulty: number;
  diffArray: string[];
  currentTurn: string;
  player: {
    name: string;
    board: never[];
    shipList: Array<Ship>
  }
}

export interface Ship {
  name: string;
  length: number;
  horizontal: Boolean;
  hitCount: number;
}