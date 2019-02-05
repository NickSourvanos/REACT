import React from 'react'
import {connect} from 'react-redux'

import { getTest } from '../store/selectors'

import { set } from '../store/test/actions'

import Test from './test'

const TestCont = ({getTest, set}) => 
        <Test 
            getTest={getTest}
            set={set}
        />

const mapStateToProps = (state, ownProps) => (
    {
        getTest: getTest(state)
    }
)

const mapDispatchToProps = {
    set
}

export default connect(mapStateToProps, mapDispatchToProps)(TestCont)