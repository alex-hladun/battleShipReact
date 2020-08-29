import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Lobby from './Lobby'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);

describe("Lobby", () => {

  let store: any;

  beforeEach(() => {
    store = mockStore({
      lobbyState: {
        gameList: {
          'testgame': {
            name: 'test game',
            boardSize: 10,
            host: {
              name: 'Test',
              board: []
            },
            hostReady: true,
            hostTurn: null,
            opponent: null,
            opponentReady: false
          }
        }
      },
      gameState: {
        player: {
          name: 'test'
        }
      }
    });

    store.dispatch = jest.fn();
  });

  it("should render the lobby", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Lobby />
      </Provider>
    );
    const testgame = getByText(/test game/i);
    expect(testgame).toBeInTheDocument();
    fireEvent.click(testgame);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  })
})