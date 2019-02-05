import React from 'react'
import {connect} from 'react-redux'

import { getCounter } from '../store/selectors'

import { clickPlus, clickMinus } from '../store/counter/actions'

import App from './app'
import Test from './test'

const Index = ({getCounter, clickPlus, clickMinus}) => 
    <div>

        <App 
            clickPlus={clickPlus}
            clickMinus={clickMinus}
            getCounter={getCounter}
        />

        <Test />

    </div>

const mapStateToProps = (state, ownProps) => (
    {
        getCounter: getCounter(state)
    }
)

const mapDispatchToProps = {
    clickPlus,
    clickMinus
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)