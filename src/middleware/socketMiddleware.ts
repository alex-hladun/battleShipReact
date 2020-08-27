import * as actions from '../modules/websocket'
import { setGameID, setGhostBoard, setCurrentTurn, setNewGameData } from '../reducers/gameStateSlice'
import { transitionToGame } from '../reducers/viewModeSlice'
import socketIOClient from 'socket.io-client'
import { updateLobby } from '../reducers/lobbyStateSlice'

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
        case 'update_game':
          store.dispatch(setGameID(payload.data.gameID));
          break;
        default:
          break;
      }
    }

    const onData = (payload: any) => {
      switch (payload.type) {
        case 'update_ghost_board':
          console.log(payload.data)
          store.dispatch(setGhostBoard(payload.data))
          store.dispatch(setCurrentTurn(payload.data))
          break;
        case 'update_game_list':
          store.dispatch(updateLobby(payload.data))
          console.log(payload);
          break;
        case 'new_game_data':
          console.log('new game data from server', payload.data)
          store.dispatch(setNewGameData(payload.data))
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
            console.log('game ID data received', data)
            onMessage({
              type: 'update_game',
              data
            })
          })
          socket.on('ghostBoardUpdate', (data: any) => {
            console.log('ghost board update received', data)
            onData({
              type: 'update_game',
              data
            })
          })
          socket.on('gameListUpdate', (data: any) => {
            console.log('game List update received', data)
            onData({
              type: 'update_game_list',
              data
            })
          })
          socket.on('joinSuccess', (data: any) => {
            console.log('join success', data)
            return new Promise (() => onData({
              type: 'new_game_info',
              data
            })).then(
              store.dispatch(transitionToGame())
            )
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
        case 'JOIN_GAME':
          console.log('joining an existing game', action.data);
          socket.emit('joinGame', action.data);
          break;
        case 'SEND_BOARD':
          console.log(action)
          socket.emit('donePlacing', {
            game: action.data.game,
            user: action.data.user,
            board: action.data.board
          })
          break;
        default:
          // console.log('the next action:', action);
          return next(action);
      }
    };

  }
};

export default socketMiddleware();