import React from 'react';
import { render, fireEvent, getByTestId, getByText, waitForElement } from '@testing-library/react';
import Disconnect from './Disconnect'
// import store from '../../store/index'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe("Disconnect Component", () => {

  let store: any;
 
  beforeEach(() => {
    store = mockStore({
      myState: 'sample text',
    });

    store.dispatch = jest.fn();
  });
  
  it("should render the lobby", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Disconnect />
      </Provider>
    );
    const disconnect = getByText(/Return to Lobby/i);
    expect(disconnect).toBeInTheDocument();
    fireEvent.click(disconnect)

    // 3 times, as there are 3 dispatch methods required to reset the game state and return to the lobyy
    expect(store.dispatch).toHaveBeenCalledTimes(3);
  })
})