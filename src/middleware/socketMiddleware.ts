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
          console.log(payload);
          break;
        case 'new_game_info':
          // When a player joins, the remaining game details are sent to syncronize players. 
          console.log('new game data from server', payload.data)
          store.dispatch(setNewGameData(payload.data))
          break;
        case 'add_game_message':
          console.log('new game message from server', payload.data)
          store.dispatch(addNewMessage(payload.data))
          break;
        case 'start_game':
          console.log('new game message from server', payload.data)
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
            console.log('game ID data received', data)
            onMessage({
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
            console.log('game text update received', data)
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
            console.log('disconnected command receive', data)
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
        case 'ATTACK_ENEMY':
          socket.emit('attack', {
            game: action.data.game,
            user: action.data.user,
            col: action.data.col,
            row: action.data.row
          })
          break;
        case 'LEAVE_GAME':
          console.log(action.data)
          socket.emit('leaveGame', {
            game: action.data.game,
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