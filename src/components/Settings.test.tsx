import React from 'react';
import { render, fireEvent, getByTestId, getByText } from '@testing-library/react';
import Settings from './Settings';
import store from '../store/index'
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