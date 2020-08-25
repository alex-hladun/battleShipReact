import * as actions from '../modules/websocket'
import { setGameID } from '../reducers/gameStateSlice'
import socketIOClient from 'socket.io-client'


const socketMiddleware = () => {
  let socket: any = null;

  const onOpen = (store: any) => (event: any) => {
    console.log('websocket open');
    store.dispatch(actions.wsConnected())
  }

  const onClose = (store: any) => () => {
    store.dispatch(actions.wsDisconnected());
  };

  const onMessage = (store: any) => (payload: any) => {
    // Would like to get this working! BUt instead putting below
    console.log('receiving server message');

    switch (payload.type) {
      case 'set_game_id':
        console.log('indside middleware reducer to set game id')
        store.dispatch(setGameID(payload.gameID));
        break;
      default:
        break;
    }
  }

  return (store: any) => (next: any) => (action: any) => {
    switch (action.type) {
      case 'WS_CONNECT':
        if (socket !== null) {
          socket.close();
        }

        // connect to the remote host
        socket = socketIOClient();
        console.log('WebSocket created in Middleware!')
        // socket = new WebSocket(action.host);

        // websocket handlers
        // socket.onmessage = onMessage(store);
        socket.onclose = onClose(store);
        socket.onopen = onOpen(store);
        socket.on('set_game_id', (data: any) => {
          console.log('set game id req received', data)
          store.dispatch(setGameID(data))
          // onMessage(store)

        })

        break;
      case 'WS_DISCONNECT':
        if (socket !== null) {
          socket.close();
        }
        socket = null;
        console.log('websocket closed');
        break;
      case 'NEW_GAME':
        console.log('starting a new game', action.data);
        socket.emit('newGame', action.data);
        break;
      default:
        console.log('the next action:', action);
        return next(action);
    }
  };
};

export default socketMiddleware();