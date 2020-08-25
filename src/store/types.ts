export interface State {
  gameState: GameState
}

export interface Ship {
  name: string;
  length: number;
  horizontal: Boolean;
  hitCount: number;
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
