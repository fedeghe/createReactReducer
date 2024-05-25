import TESTACTIONS from './actions'
import ACTIONS from '../actions'

import rx from "../index.js"
const { func: reducer } = rx;

describe('test reducer', () => {
    const testReducerAction = label => {
        describe(`tests for action: ${label}`, () => {
            it.each(TESTACTIONS[label])(
                `${ACTIONS[label].description}: %s`,
                (_, state, action, expected) => 
                    expect(reducer(state, action)).toMatchObject(expected)
            );
        })
    }
    Object.keys(ACTIONS).forEach(testReducerAction);
})