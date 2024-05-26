# Create react reducer

Install globally
```
yarn global add createreactreducer
```


---
### Motivation  
The main reason is cause I'm lazy and I dont want always to manually setup the whole thing around `useReducer`... one step at time.  
- actions name should be constants (definitely not strings devs must rem).. thus why not Symbol? (actually the only pro in using Symbols would be to avoid clashes)
- each action should have its own function;  
this also allows implicitely to avoid code noone should write anywhere:
    ``` js
    function reducer(state, action) {
        switch (action.type) {
            case 'incremented_age': { 
                return { //
    ```
- officially the reducer function you write must return the whole state; wouldn't be better to just return the updates?
    ``` js
    const actfuncs = {
        ...
        [ACTIONS.ADD]: ({
            oldState: {
                opNumber, res
            },
            payload}) => ({
                ...oldState, // ❌
                opNumber: opNumber+1,
                res: res + (parseInt(payload, 10) || 0)
        })
        ...
    }
    ```
- all of the previous points reveal their value when it comes to testing, cause we want to test our reducers right!!!  
The idea is to allow us to easily add testcases purely based on the only 3 core informations we need:  
`{ oldState, action, newState }`  
and it would be great to add a new test case for an action simply providing that 3-uple.

### Use it  
_createreactreducer_ script creates the barebone structure for that, and it is intended to be ran as a first thing when one realize a reducer is needed:
- move to the folder where you want to create a new reducer
- run `createreactreducer add sub reset ....`

here `add sub reset` is just an example.

It will create within the execution folder : 
```
 ╠═ reducer/
 ║  ╠═ test/
 ║  ║  ╠═ actions/
 ║  ║  ║  ╟╴ index.js
 ║  ║  ║  ╟╴ sub.js     // as many 
 ║  ║  ║  ╟╴ reset.js   // as specified
 ║  ║  ║  ╙╴ add.js     // parameters
 ║  ║  ╙╴ index.spec.js
 ║  ╟╴ actions.js
 ║  ╙╴ index.js
```

It will create action-case-test files within `reducer/test/actions`.  
The only needed thing is implement your actions in `reducer/index.js` and edit the test action accordingly, then just test the `test/index.spec.js`. For further actions You can reply on your AI-revamped c & v talent.  
Most likely you will never have to edit `reducer/test/index.spec.js`, probably it will always look like:
```js
import TESTACTIONS from "./actions"
import ACTIONS from "../actions"
import rx from "../index.js"
const { func: reducer } = rx;
describe("test reducer", () => {
  const testReducerAction = label => {
    describe(`tests for action: ${label}`, () => {
      it.each(TESTACTIONS[label])(
        `${ACTIONS[label].description}: %s`,
        (_, state, action, expected) => 
          expect(
            reducer(state, action)
          ).toMatchObject(expected)
        );
    })
  }
  Object.keys(ACTIONS).forEach(testReducerAction);
})
```
dinamically loading all the testcases exported through `reducer/test/actions/index.js`.

That's all.
