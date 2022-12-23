import React from 'react'
import ReactDOM from 'react-dom/client'
import { applyMiddleware, legacy_createStore as createStore } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

import rootReducer from './reducers'
import App from './components/App'
import TicketSearchService from './services/TicketSearchService'
import { TicketServiceProvider } from './components/context'

import './index.css'

const ticketSearchService = new TicketSearchService()

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)))

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <TicketServiceProvider value={ticketSearchService}>
      <App />
    </TicketServiceProvider>
  </Provider>
)
