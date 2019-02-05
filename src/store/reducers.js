import {combineReducers} from 'redux'

import counter from './counter/reducers'
import test from './test/reducers'

const rootReducer = combineReducers({
  counter,
  test
})

export default rootReducer