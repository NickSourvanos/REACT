import './embed'
import React from 'react'
import ReactDOM from 'react-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import routes from './routes'
import configureStore from './store'

const history = createBrowserHistory()
export const store = configureStore(history)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} >
      {routes}
    </Router>
  </Provider>
  , document.getElementById('app')
)