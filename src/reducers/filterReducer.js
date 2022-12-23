const initialState = {
  allStopsChecked: { value: false, display: 'Все' },
  nonStopsChecked: { value: false, display: 'Без пересадок' },
  oneStopsChecked: { value: false, display: '1 пересадка' },
  twoStopsChecked: { value: false, display: '2 пересадки' },
  threeStopsChecked: { value: false, display: '3 пересадки' },
  // fourStopsChecked: { value: false, display: '4 пересадки' },
  // fiveStopsChecked: { value: false, display: '5 пересадок' },
  // sixStopsChecked: { value: false, display: '6 пересадок' },
  // sevenStopsChecked: { value: false, display: '7 пересадок' },
  // eightStopsChecked: { value: false, display: '8 пересадок' },
  // nineStopsChecked: { value: false, display: '9 пересадок' },
}

export const filterReducer = (state = initialState, action) => {
  const name = action.name
  const value = action.value
  let result

  if (action.name === 'allStopsChecked') {
    result = Object.keys(state).reduce((a, b) => ({ ...a, [b]: { ...state[b], value } }), {})
  } else {
    if (!value)
      result = {
        ...state,
        [name]: { ...state[name], value },
        ['allStopsChecked']: { ...state['allStopsChecked'], value },
      }
    else {
      result = { ...state, [name]: { ...state[name], value } }
      let check = 0
      for (const prop in result) {
        if (Object.hasOwn(result, prop) && prop !== 'allStopsChecked') {
          if (!result[prop].value) check++
        }
      }
      if (!check) {
        result = {
          ...state,
          [name]: { ...state[name], value },
          ['allStopsChecked']: { ...state['allStopsChecked'], value },
        }
      }
    }
  }

  switch (action.type) {
    case 'SET_FILTER':
      return result
    default:
      return state
  }
}
