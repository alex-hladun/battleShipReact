import React from 'react';
import { render, fireEvent, getByTestId, getByText, waitForElement } from '@testing-library/react';
import Settings from './Settings';
import store from '../../store/index'
import { TypedUseSelectorHook, useSelector, useDispatch, Provider } from 'react-redux'


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

// test("Starts the game", async () => {
//   const { container } = render(
//     <Provider store={store}>
//       <Settings />
//     </Provider>
//   );
//   const startComputerGame = getByTestId(container, 'start-cpu-game')
//   fireEvent.click(startComputerGame)
//   expect(getByText(startComputerGame, "New Game")).toBeInTheDocument();


// })