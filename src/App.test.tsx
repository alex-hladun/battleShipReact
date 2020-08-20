import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux'
import store from './store/index'

test('renders Battleship react header', () => {
  const { getAllByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const header = getAllByText(/BATTLESHIP/i);
  expect(header[0]).toBeInTheDocument();
});
