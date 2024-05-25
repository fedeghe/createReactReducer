import TESTACTIONS from './actions'
import ACTIONS from '../../actions'

describe('test reducer', () => {
    const testReducerAction = label => {
        describe(`tests for action: ${label}`, () => {
            it.each(TESTACTIONS[label])(
                `${ACTIONS[label].description}: %s`,
                (_, state, action, expected) => 
                    expected(reducer(state, action)).toMatchObject(expected)
            );
        })
    }
    Object.keys(ACTIONS).forEach(testReducerAction);
})