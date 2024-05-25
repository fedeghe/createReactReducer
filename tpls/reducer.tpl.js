import ACTIONS from './actions'

const init = p => p

const actions = {
        [ACTIONS.INIT]: ({ payload }) => init(payload),
        //ACTIONS
    },
    reducer = (oldState, {payload, type}) => 
        (type in actions)
            ? Object.assign({}, oldState, actions[type]({oldState, payload}))
            : oldState;
export default {
    func: reducer,
    init: o => reducer({}, {type: ACTIONS.INIT, payload: o}),
}