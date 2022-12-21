import React from 'react'
import ReactDOM from 'react-dom/client'
import { legacy_createStore as createStore } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from './reducers'
import App from './components/App'

import './index.css'

const store = createStore(rootReducer, composeWithDevTools())

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
