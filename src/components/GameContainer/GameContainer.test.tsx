import React from 'react';
import { render, fireEvent, getAllByTestId } from '@testing-library/react';
import GameContainer from './GameContainer'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store';
// import { initialState }  from '../../reducers/gameStateSlice'
// import { initalCellState } from '../../reducers/cellStateSlice'
const mockStore = configureStore([]);

describe("GameContainer", () => {

  let store: any;

  beforeEach(() => {
    store = mockStore({
      lobbyState: {
        gameList: {
          'testgame': {
            name: 'test game',
            boardSize: 10,
            host: {
              name: 'Test Name',
              board: []
            },
            hostReady: true,
            hostTurn: null,
            opponent: {
              name: 'Test opponent',
              board: [['O', 'O', 'O', 'O', 'O', 'O'], ['O', 'O', 'O', 'O', 'O', 'O'], ['O', 'O', 'O', 'O', 'O', 'O'], ['O', 'O', 'O', 'O', 'O', 'O']]
            },
            opponentReady: false
          }
        }
      },
      gameState: {
        gameID: '',
        gameLog: ['Welcome to BATTLESHIP! Place your ships. Press \'R\' to rotate.'],
        winner: '',
        boardSize: 9,
        gameStatus: 'Place your ships',
        difficulty: 1,
        diffArray: ['EASY', 'MEDIUM', 'HARD', 'IMPOSSIBLE'],
        currentTurn: '',
        player: {
          name: 'Test Player',
          ghostBoard: [],
          board: [['O', 'O', '1', '1', '0', '0', '0', '0', 'O'],
          ['O', 'O', '1', '1', '0', '0', '0', '0', 'O'],
          ['O', 'O', '1', '1', '0', '0', '0', '0', 'O'],
          ['O', 'O', '1', '1', '0', '0', '0', '0', 'O'],
          ['O', 'O', '1', '1', '0', '0', '0', '0', 'O'],
          ['O', 'O', '1', '1', '0', '0', '0', '0', 'O'],
          ['O', 'O', '1', '1', '0', '0', '0', '0', 'O'],
          ['O', 'O', '1', '1', '0', '0', '0', '0', 'O'],
          ['O', 'O', '1', '1', '0', '0', '0', '0', 'O']
          ],
          shipList: [
            {
              name: 'Carrier',
              length: 5,
              horizontal: true,
              hitCount: 0
            },
            {
              name: 'Battleship',
              length: 4,
              horizontal: true,
              hitCount: 0
            },
            {
              name: 'Cruiser',
              length: 3,
              horizontal: true,
              hitCount: 0
            },
            {
              name: 'Submarine',
              length: 3,
              horizontal: true,
              hitCount: 0
            },
            {
              name: 'Destroyer',
              length: 2,
              horizontal: true,
              hitCount: 0
            }
          ]
        },
        opponent: {
          name: 'Waiting for Opponent...',
          board: [['O', 'O', '1', '1', '0', '0', '0', '0', 'O'],
          ['O', 'O', '1', '1', '0', '0', '0', '0', 'O'],
          ['O', 'O', '1', '1', '0', '0', '0', '0', 'O'],
          ['O', 'O', '1', '1', '0', '0', '0', '0', 'O'],
          ['O', 'O', '1', '1', '0', '0', '0', '0', 'O'],
          ['O', 'O', '1', '1', '0', '0', '0', '0', 'O'],
          ['O', 'O', '1', '1', '0', '0', '0', '0', 'O'],
          ['O', 'O', '1', '1', '0', '0', '0', '0', 'O'],
          ['O', 'O', '1', '1', '0', '0', '0', '0', 'O']
          ],
          ghostBoard: [],
          shipList: [
            {
              name: 'Carrier',
              length: 5,
              horizontal: true,
              hitCount: 0
            },
            {
              name: 'Battleship',
              length: 4,
              horizontal: true,
              hitCount: 0
            },
            {
              name: 'Cruiser',
              length: 3,
              horizontal: true,
              hitCount: 0
            },
            {
              name: 'Submarine',
              length: 3,
              horizontal: true,
              hitCount: 0
            },
            {
              name: 'Destroyer',
              length: 2,
              horizontal: true,
              hitCount: 0
            }
          ]
        }
      },
      cellState: {
        shipLen: 4,
        shipIndex: 0,
        hz: true,
        row: 2,
        col: 2
      }
    });


    store.dispatch = jest.fn();
  });

  it("should render the gameContainer and dispatch when a cell is clicked", () => {
    const { getByText, container } = render(
      <Provider store={store}>
        <GameContainer />
      </Provider>
    );
    const testgame = getByText(/Test Player/i);
    expect(testgame).toBeInTheDocument();
    const boardCell = getAllByTestId(container, 'test-board-cell')[0]
    fireEvent.mouseOver(boardCell)
    expect(store.dispatch).toHaveBeenCalledTimes(3);
    fireEvent.click(boardCell);
    expect(store.dispatch).toHaveBeenCalledTimes(3);
    const cpuBoardCell = getAllByTestId(container, 'test-board-cell')[100]
    fireEvent.click(cpuBoardCell);
    expect(store.dispatch).toHaveBeenCalledTimes(3);
  })
  it("should Return to the lobby", () => {
    const { getByText } = render(
      <Provider store={store}>
        <GameContainer />
      </Provider>
    );
    const newGame = getByText(/New Game/i);
    expect(newGame).toBeInTheDocument();

    fireEvent.click(newGame);
    expect(store.dispatch).toHaveBeenCalledTimes(6);
  })
  it("should dispatch a different action when ship is not hz", () => {
    store.cellState = {
      shipLen: 4,
      shipIndex: 0,
      hz: false,
      row: 2,
      col: 2
    };
    const { getByText, container } = render(
      <Provider store={store}>
        <GameContainer />
      </Provider>
    );


    const testgame = getByText(/Test Player/i);
    expect(testgame).toBeInTheDocument();
    const boardCell = getAllByTestId(container, 'test-board-cell')[120]
    fireEvent.mouseOver(boardCell)
    expect(store.dispatch).toHaveBeenCalledTimes(3);
    fireEvent.click(boardCell);
    expect(store.dispatch).toHaveBeenCalledTimes(3);
    const cpuBoardCell = getAllByTestId(container, 'test-board-cell')[100]
    fireEvent.click(cpuBoardCell);
    expect(store.dispatch).toHaveBeenCalledTimes(3);
  })
})