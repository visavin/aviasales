const initialState = {
  allStopsChecked: { value: true, display: 'Все' },
  nonStopsChecked: { value: true, display: 'Без пересадок' },
  oneStopsChecked: { value: true, display: '1 пересадка' },
  twoStopsChecked: { value: true, display: '2 пересадки' },
  threeStopsChecked: { value: true, display: '3 пересадки' },
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
