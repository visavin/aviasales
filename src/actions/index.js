export const setDisplayCount = (value) => ({ type: 'SET_DISPLAY_COUNT', payload: value })

export const setFilter = (name, value) => ({ type: 'SET_FILTER', name, value })

export const setSort = (name, value) => ({ type: 'SET_SORT', name, value })

const searchIdRequested = () => ({ type: 'FETCH_SEARCH_ID_REQUEST' })

const searchIdLoaded = (searchId) => ({ type: 'FETCH_SEARCH_ID_SUCCESS', payload: searchId })

const ticketsLoaded = (newTickets) => ({ type: 'FETCH_TICKETS_SUCCESS', payload: newTickets })

const ticketsError = (error) => ({ type: 'FETCH_TICKETS_FAILURE', payload: error })

export const fetchSearchId = (ticketSearchService) => (dispatch) => {
  dispatch(searchIdRequested())
  ticketSearchService
    .getSearchId()
    .then((data) => dispatch(searchIdLoaded(data)))
    .catch((err) => console.log(err))
}

export const fetchTickets = (ticketSearchService, searchId) => (dispatch) => {
  ticketSearchService
    .getTickets(searchId)
    .then((data) => dispatch(ticketsLoaded(data)))
    .catch((err) => dispatch(ticketsError(err)))
}
