const initialState = {
  tickets: [],
  loading: true,
  stop: true,
  error: null,
}

export const ticketReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_TICKETS_REQUEST':
      return {
        tickets: [],
        loading: true,
        stop: true,
        error: null,
      }

    case 'FETCH_TICKETS_SUCCESS':
      return {
        tickets: action.payload.tickets,
        loading: false,
        stop: action.payload.stop,
        error: null,
      }

    case 'FETCH_TICKETS_FAILURE':
      return {
        tickets: state.tickets,
        loading: false,
        stop: true,
        error: action.payload,
      }

    default:
      return state
  }
}
