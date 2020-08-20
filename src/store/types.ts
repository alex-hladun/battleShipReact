export interface State {
  settings: {
    testVal: Number
  }
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
  player: {
    name: string;
    board: never[];
    shipList: Array<Ship>
  }
}
