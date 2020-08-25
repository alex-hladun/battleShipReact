import * as actions from '../modules/websocket'
import { setGameID } from '../reducers/gameStateSlice'
import socketIOClient from 'socket.io-client'


const socketMiddleware = () => {
  return (store: any) => {
    let socket: any = null;

    const onOpen = (store: any) => {
      console.log('websocket open');
      store.dispatch(actions.wsConnected())
    }

    const onClose = (payload: any) => () => {
      store.dispatch(actions.wsDisconnected());
    };

    const onMessage = (payload: any) => {
      switch (payload.type) {
        case 'set_game_id':
          console.log('indside middleware reducer to set game id')
          store.dispatch(setGameID(payload.data));
          break;
        default:
          break;
      }
    }

    return (next: any) => (action: any) => {
      switch (action.type) {
        case 'WS_CONNECT':
          if (socket !== null) {
            socket.close();
          }

          // connect to the remote host
          socket = socketIOClient();

          // websocket handlers
          socket.on('set_game_id', (data: any) => {
            onMessage({
              type: 'set_game_id',
              data
            })

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

  }
};

export default socketMiddleware();