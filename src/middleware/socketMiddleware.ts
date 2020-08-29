import { 
  setGameID, 
  setCurrentTurn, 
  setNewGameData, 
  resetBoard, 
  addNewMessage,
  addOpponent,
  addShipHit,
  updateBoard,
  setWinner
 } from '../reducers/gameStateSlice'
import { transitionToGame, transitionToDisconnect } from '../reducers/viewModeSlice'
import socketIOClient from 'socket.io-client'
import { updateLobby } from '../reducers/lobbyStateSlice'
import { leaveGame } from '../modules/websocket'

const socketMiddleware = () => {
  return (store: any) => {
    let socket: any = null;

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
        case 'update_game_list':
          store.dispatch(updateLobby(payload.data))

          break;
        case 'new_game_info':
          // When a player joins, the remaining game details are sent to syncronize players. 
          store.dispatch(setNewGameData(payload.data))
          break;
        case 'add_game_message':
          store.dispatch(addNewMessage(payload.data))
          break;
        case 'start_game':
          // Assign the game status to 'player turn'. 
          // Change current player turn in gameState
          store.dispatch(setCurrentTurn(payload.data.currentTurn))
          break;
        case 'update_game_data':
          if (payload.data.currentTurn) {
            store.dispatch(setCurrentTurn(payload.data.currentTurn))
          }
          if (payload.data.message) {
            store.dispatch(addNewMessage(payload.data.message))
          }
          if (payload.data.opponentName) {
            store.dispatch(addOpponent(payload.data.opponentName))
          }
          if (payload.data.shipUpdate) {
            store.dispatch(addShipHit(payload.data.shipUpdate))
          }
          if (payload.data.attackResults) {
            store.dispatch(updateBoard(payload.data.attackResults))
          }
          if (payload.data.winner) {
            store.dispatch(setWinner(payload.data.winner))
          }
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
              type: 'update_game',
              data
            })
          })
          socket.on('gameListUpdate', (data: any) => {
            onData({
              type: 'update_game_list',
              data
            })
          })
          socket.on('joinSuccess', (data: any) => {
            return new Promise(() => onData({
              type: 'new_game_info',
              data
            })).then(
              store.dispatch(resetBoard())
            ).then(
              store.dispatch(transitionToGame())
            )
          })
          socket.on('textMessage', (data: any) => {
            onData({
              type: 'add_game_message',
              data
            })
          })
          socket.on('startGame', (data: any) => {
            onData({
              type: 'start_game',
              data
            })})
          socket.on('updateGame', (data: any) => {
            onData({
              type: 'update_game_data',
              data
            })
          })
          socket.on('disconnected', (data: any) => {
            store.dispatch(transitionToDisconnect())
            store.dispatch(leaveGame(data))
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
          socket.emit('newGame', action.data);
          break;
        case 'JOIN_GAME':
          socket.emit('joinGame', action.data);
          break;
        case 'SEND_BOARD':
          socket.emit('donePlacing', {
            game: action.data.game,
            user: action.data.user,
            board: action.data.board
          })
          break;
        case 'ATTACK_ENEMY':
          socket.emit('attack', {
            game: action.data.game,
            user: action.data.user,
            col: action.data.col,
            row: action.data.row
          })
          break;
        case 'LEAVE_GAME':
          socket.emit('leaveGame', {
            game: action.data.game,
          })
          break;
        default:
          return next(action);
      }
    };

  }
};

export default socketMiddleware();