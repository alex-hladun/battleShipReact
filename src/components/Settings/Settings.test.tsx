import React from 'react';
import { render, fireEvent, getByTestId, getByText } from '@testing-library/react';
import Settings from './Settings';
import store from '../../store/index'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store';
import { start } from 'repl';
const mockStore = configureStore([]);
let store2: any;


test('Renders the ship list properly', () => {
  const { getByText } = render(
    <Provider store={store}>
      <Settings />
    </Provider>
  );
  const carrier = getByText(/Carrier/i);
  expect(carrier).toBeInTheDocument();
});

test('Adds to the board size properly', () => {
  const { container } = render(
    <Provider store={store}>
      <Settings />
    </Provider>
  );
  const incBoardSize = getByTestId(container, 'inc-board-size')
  fireEvent.click(incBoardSize)
  expect(getByTestId(container, 'board-size')).toHaveTextContent('11')
})

test('Ensures max board size of 15', () => {
  const { container } = render(
    <Provider store={store}>
      <Settings />
    </Provider>
  );
  const incBoardSize = getByTestId(container, 'inc-board-size')
  fireEvent.click(incBoardSize)
  fireEvent.click(incBoardSize)
  fireEvent.click(incBoardSize)
  fireEvent.click(incBoardSize)
  fireEvent.click(incBoardSize)
  fireEvent.click(incBoardSize)
  fireEvent.click(incBoardSize)
  fireEvent.click(incBoardSize)
  expect(getByTestId(container, 'board-size')).toHaveTextContent('15')
  
  const decBoardSize = getByTestId(container, 'dec-board-size')
  fireEvent.click(decBoardSize)
  expect(getByTestId(container, 'board-size')).toHaveTextContent('14')

})

test('Change difficulty to hard', () => {
  const { container } = render(
    <Provider store={store}>
      <Settings />
    </Provider>
  );
  const increaseDifficulty = getByTestId(container, 'inc-difficulty')
  fireEvent.click(increaseDifficulty)
  expect(getByTestId(container, 'difficulty')).toHaveTextContent('HARD')
  const decreaseDifficulty = getByTestId(container, 'dec-difficulty')
  fireEvent.click(decreaseDifficulty)
  fireEvent.click(decreaseDifficulty)
  fireEvent.click(decreaseDifficulty)
  fireEvent.click(decreaseDifficulty)
  expect(getByTestId(container, 'difficulty')).toHaveTextContent('EASY')

})

test('Max difficulty is impossible', () => {
  const { container } = render(
    <Provider store={store}>
      <Settings />
    </Provider>
  );
  const increaseDifficulty = getByTestId(container, 'inc-difficulty')
  fireEvent.click(increaseDifficulty)
  fireEvent.click(increaseDifficulty)
  fireEvent.click(increaseDifficulty)
  expect(getByTestId(container, 'difficulty')).toHaveTextContent('IMPOSSIBLE')
})

test('Change Battleship Length to 6', () => {
  const { container } = render(
    <Provider store={store}>
      <Settings />
    </Provider>
  );
  const increaseBattleshipLength = getByTestId(container, 'inc-ship-length-1')
  fireEvent.click(increaseBattleshipLength)
  expect(getByTestId(container, 'ship-length-1')).toHaveTextContent('5')
})

test("Starts the game", async () => {

  store2 = mockStore({
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

  store2.dispatch = jest.fn();
  
  const { container } = render(
    <Provider store={store2}>
      <Settings />
    </Provider>
  );
  const startComputerGame = getByTestId(container, 'start-cpu-game')
  expect(getByText(startComputerGame, "Play Computer")).toBeInTheDocument();
  fireEvent.click(startComputerGame)
  expect(store2.dispatch).toHaveBeenCalledTimes(4);
  const startFriendGame = getByTestId(container, 'start-online-game')
  expect(getByText(startFriendGame, "Play Online")).toBeInTheDocument();
  fireEvent.click(startFriendGame)
  expect(store2.dispatch).toHaveBeenCalledTimes(8);


})