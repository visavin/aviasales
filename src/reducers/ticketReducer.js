const initialState = {
  tickets: [],
  searchId: null,
  stop: false,
  error: null,
}

export const ticketReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_SEARCH_ID_REQUEST':
      return {
        tickets: [],
        searchId: null,
        stop: false,
        error: null,
      }

    case 'FETCH_SEARCH_ID_SUCCESS':
      return {
        tickets: [],
        searchId: action.payload,
        stop: false,
        error: null,
      }

    case 'FETCH_TICKETS_SUCCESS':
      return {
        tickets: state.tickets.concat(action.payload.tickets),
        searchId: state.searchId,
        stop: action.payload.stop,
        error: null,
      }

    case 'FETCH_TICKETS_FAILURE':
      return {
        tickets: state.tickets,
        searchId: state.searchId,
        stop: false,
        error: action.payload,
      }

    default:
      return state
  }
}
