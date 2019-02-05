import * as act from './actions'
import {handleActions} from 'redux-actions'

const initialState = {
    counter: 0
}

export default handleActions({

    [ act.clickPlus ]: (state,action) => ({
        ...state,
        counter: state.counter + 1
    }),

    [ act.clickMinus ]: (state,action) => ({
        ...state,
        counter: state.counter - 1
    })
    
}, initialState)