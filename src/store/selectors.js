import * as counter from './counter/selectors'

export const getCounter = state => counter.getCounter(state.counter)