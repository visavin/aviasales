export const setFilter = (name, value) => ({ type: 'SET_FILTER', name, value })

export const setSort = (name, value) => ({ type: 'SET_SORT', name, value })

const ticketsRequested = () => ({ type: 'FETCH_TICKETS_REQUEST' })

const ticketsLoaded = (newTickets) => ({ type: 'FETCH_TICKETS_SUCCESS', payload: newTickets })

const ticketsError = (error) => ({ type: 'FETCH_TICKETS_FAILURE', payload: error })

export const fetchTickets = (ticketSearchService) => (dispatch) => {
  dispatch(ticketsRequested())
  ticketSearchService
    .getTickets()
    .then((data) => dispatch(ticketsLoaded(data)))
    .catch((err) => dispatch(ticketsError(err)))
}
