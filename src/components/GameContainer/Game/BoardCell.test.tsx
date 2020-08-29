import React from 'react';
import { render, fireEvent, getByTestId, getByText, waitForElement, getAllByTestId } from '@testing-library/react';
import BoardCell from './BoardCell'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store';
// import { initialState }  from '../../reducers/gameStateSlice'
// import { initalCellState } from '../../reducers/cellStateSlice'
const mockStore = configureStore([]);

describe("BoardCell", () => {

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
        hz: false,
        row: 2,
        col: 2
      }
    });


    store.dispatch = jest.fn();
  });

  it("should render the gameContainer and dispatch when a cell is clicked", () => {
    const { getByText, container } = render(
      <Provider store={store}>
        <BoardCell row={2} col={2} ownBoard={true} />
      </Provider>
    );

    const boardCell = getAllByTestId(container, 'test-board-cell')[0]
    console.log(boardCell);
    expect(boardCell).toBeInTheDocument()

    fireEvent.click(boardCell);
    expect(store.dispatch).toHaveBeenCalledTimes(2);
  })

  it("should attack the enemy cpu", () => {
    const store2 = mockStore({
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
        gameStatus: 'Your Turn',
        difficulty: 1,
        diffArray: ['EASY', 'MEDIUM', 'HARD', 'IMPOSSIBLE'],
        currentTurn: '',
        player: {
          name: 'Test Player',
          ghostBoard: [],
          board: [['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', '1', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', '1', '1', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', '1', '1', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', '1', '1', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', '1', '1', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', '1', '1', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', '1', '1', 'O', 'O', 'O', 'O', 'O']
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
          board: [['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', '1', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', '1', '1', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', '1', '1', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', '1', '1', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', '1', '1', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', '1', '1', 'O', 'O', 'O', 'O', 'O'],
          ['O', 'O', '1', '1', 'O', 'O', 'O', 'O', 'O']
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
        hz: false,
        row: 9,
        col: 9
      }
    });

    const { getByText, container } = render(
      <Provider store={store2}>
        <BoardCell row={9} col={9} ownBoard={false} boardSize={1} />
      </Provider>
    );

    const boardCell = getAllByTestId(container, 'test-board-cell')[0]
    // console.log(boardCell);
    expect(boardCell).toBeInTheDocument()

    fireEvent.click(boardCell);
    expect(store.dispatch).toHaveBeenCalledTimes(0);

  })

})
