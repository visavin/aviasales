import { combineReducers } from 'redux'

import { filterReducer } from './filterReducer'
import { sortReducer } from './sortReducer'
import { ticketReducer } from './ticketReducer'
import { displayReducer } from './displayReducer'

const rootReducer = combineReducers({
  filter: filterReducer,
  sort: sortReducer,
  tickets: ticketReducer,
  display: displayReducer,
})

export default rootReducer
