export default function settingsReducer(state, action) {
  switch (action.type) {
    case 'SET_SHOTS_PER_TURN':
      return {
        ...state,
        shotsPerTurn: action.payload
      }
      default:
        return state;
    }
  }