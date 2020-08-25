import {Socket} from "socket.io-client"

export interface State {
  gameState: GameState,
  socketState: SocketState
}



export interface SocketState{
  socket: typeof Socket
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