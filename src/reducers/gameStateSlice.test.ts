import gameStateReducer, { initialState, incrementBoardSize } from './gameStateSlice'
// import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
// import { State } from '../store/types'
// const typedUseSlector: TypedUseSelectorHook<State> = useSelector;
// const gameState = typedUseSlector(state => state.gameState)


describe('GameState reducer', () => {
  it('Should increment the board size when called', () => {
    const newState = (gameStateReducer(initialState, incrementBoardSize))
    expect(newState.boardSize).toEqual(11)
  })

  // it('Should return the initial state', () => {
  //   const initState = typedUseSlector(state => state.gameState)
  //   expect(initState).toEqual(initialState)

  // })

})