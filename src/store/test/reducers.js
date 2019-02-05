import * as act from './actions'
import {handleActions} from 'redux-actions'

const initialState = {
    test: 2
}

export default handleActions({

    [ act.set ]: (state,action) => ({
        ...state,
        test: 10
    })
    
}, initialState)