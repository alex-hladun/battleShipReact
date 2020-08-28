import React, { useEffect } from 'react';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import { State } from '../../../store/types'
import BoardRow from './BoardRow';
import { setActiveShipLength, changeOrientation } from '../../../reducers/cellStateSlice'
import { setGameStatus } from '../../../reducers/gameStateSlice'
import { sendBoard } from '../../../modules/websocket'


export default React.memo(function BoardContainer({ playerDetails, ownBoard = false }: any) {
  const typedUseSlector: TypedUseSelectorHook<State> = useSelector;
  const gameState = typedUseSlector(state => state.gameState)
  const cellState = typedUseSlector(state => state.cellState)
  const dispatch = useDispatch();


  // Sets the current ship length, for placing ships
  useEffect(() => {
    if (gameState.gameStatus === 'Place your ships' && cellState.shipIndex <= 4) {
      dispatch(setActiveShipLength({
        length: gameState.player.shipList[cellState.shipIndex].length
      }))
    }
  }, [dispatch, cellState.shipIndex, gameState.gameStatus, gameState.player.shipList])

  useEffect(() => {
    if (cellState.shipIndex > 4 && ownBoard && gameState.gameStatus === 'Place your ships') {
      dispatch(setGameStatus('Ready'))
      console.log('sending game BOARD')
      dispatch(sendBoard({
        game: gameState.gameID,
        user: gameState.player.name,
        board: gameState.player.board
      }))
    }
  }, [cellState.shipIndex, dispatch, gameState.gameID, gameState.player.board, gameState.player.name, ownBoard, gameState.gameStatus])

  // Adds the keypress to change ship orientation.
  useEffect(() => {
    const rKeyHandler = (event: any) => {
      if (event.keyCode === 82 && ownBoard) {
        dispatch(changeOrientation())
      }
    }
    document.addEventListener('keydown', rKeyHandler)

    return () => {
      document.removeEventListener('keydown', rKeyHandler)
    }

  }, [dispatch, ownBoard])


  const emptyBoardSizeArray = Array(gameState.boardSize).fill('')

  const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  const cellRowLabels = emptyBoardSizeArray.map((arr, index) => {
    return (
      <div className="cell-row-label">{alphabet[index].toLocaleUpperCase()}</div>
    )
  })
  const cellColumnLabels = emptyBoardSizeArray.map((arr, index) => {
    return (
      <div className="cell-row-label">{index + 1}</div>
    )
  })

  const boardRows = emptyBoardSizeArray.map((arr, index) => {
    return (
      <div className="board-row-label">
        <BoardRow boardSize={gameState.boardSize} row={index + 1} ownBoard={ownBoard} />
      </div>
    )
  })


  return (
    <div id="player-board">
      <div className="top-row-label" id="player-board-row-label">
        {cellRowLabels}
      </div>
      <div className="middle-content">
        <div className="left-column-label">
          {cellColumnLabels}
        </div>
        <div className="game-board">
          {boardRows}
        </div>
      </div>
    </div>
  )

})

