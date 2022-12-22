const initialState = {
  cheapestChecked: { value: true, display: 'Самый дешевый' },
  fastestChecked: { value: false, display: 'Самый быстрый' },
  optimalChecked: { value: false, display: 'Оптимальный' },
}

export const sortReducer = (state = initialState, action) => {
  const name = action.name
  const value = action.value

  switch (action.type) {
    case 'SET_SORT':
      return Object.keys(state).reduce(
        (a, b) => ({ ...a, [b]: { ...state[b], value: b === name ? value : !value } }),
        {}
      )
    default:
      return state
  }
}
