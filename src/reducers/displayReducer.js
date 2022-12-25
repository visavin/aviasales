const initialState = {
  displayCount: 5,
}

export const displayReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DISPLAY_COUNT':
      return {
        displayCount: state.displayCount + action.payload,
      }
    default:
      return state
  }
}
