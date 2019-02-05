import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import api from './api'
import rootReducer from './reducers'

export default function configure(browserHistory) {

    const middlewares = [
        thunk.withExtraArgument(api),
        routerMiddleware(browserHistory)
    ]

    process.env.NODE_ENV === 'development' ? middlewares.push(createLogger()) : null

    return createStore(
        rootReducer, 
        compose(
          applyMiddleware(...middlewares), 
          window.devToolsExtension
            ? window.devToolsExtension()
            : f => f
        )
    )

}