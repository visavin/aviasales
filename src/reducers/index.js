import { combineReducers } from 'redux'

import { filterReducer } from './filterReducer'
import { sortReducer } from './sortReducer'
import { ticketReducer } from './ticketReducer'

const rootReducer = combineReducers({ filter: filterReducer, sort: sortReducer, tickets: ticketReducer })

export default rootReducer
