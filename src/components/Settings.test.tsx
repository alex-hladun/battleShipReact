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
