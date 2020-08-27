export interface State {
  gameState: GameState,
  viewState: ViewState,
  cellState: CellState,
  lobbyState: LobbyState
}

export interface LobbyItem {
  [name:string] : {
    name: string
    boardSize: number;
    host: Player;
    hostReady: boolean;
    hostTurn: null | boolean;
    opponent: null | Player;
    opponentReady: boolean;
  }
}

export interface LobbyState {
  [name:string] : LobbyItem
}

export interface CellState {
  shipLen: number;
  shipIndex: number;
  hz: boolean;
  row: number;
  col: number;
}
export interface ViewState{
  view: string;
  gameOver: boolean;
}

export interface Player {
    name: string;
    board: string[][];
    ghostBoard: string [][];
    shipList: Array<Ship>
}

export interface GameState {
  gameID: string;
  gameLog: string[];
  gameStatus: string
  boardSize: number;
  difficulty: number;
  diffArray: string[];
  currentTurn: string;
  player: Player;
  opponent: any;
}

export interface Ship {
  name: string;
  length: number;
  horizontal: Boolean;
  hitCount: number;
}