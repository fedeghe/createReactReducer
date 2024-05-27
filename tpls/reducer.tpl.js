import ACTIONS from "./actions"

const init = p => p

const actions = {
        [ACTIONS.INIT]: ({ payload }) => init(payload),
        //ACTIONS
    },
    reducer = (oldState, action) => {
        const {payload, type} = action
        if (typeof type === 'undefined') throw new Error(`Action '${action}' unexpected`)
        return type in actions
            ? Object.assign({}, oldState, actions[type]({oldState, payload}))
            : oldState;
    }
export default {
    func: reducer,
    init: o => reducer({}, {type: ACTIONS.INIT, payload: o}),
}