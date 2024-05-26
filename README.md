# Create react reducer

Install globally
```
yarn global add createreactreducer
```


---
### Motivation  
The main reason is my lazyness: bored to manually setup the whole thing around `useReducer`... but, let's make one step back, with some assumptions **of mine**.  
- actions name should be constants (definitely not strings devs must remember..or worste lookup in the reducer).. thus why not Symbol? (actually the only pro in using Symbols would be to avoid clashes)
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
`{ oldState, action:{type, payload}, newState }`  
and it would be great to add a new test case for an action simply providing that 3-uple.

### Use it  
_createreactreducer_ script creates the barebone structure for that, and it is intended to be ran as first thing when one realizes a reducer is needed:
1) move to the folder where you want to create a new reducer
2) run `createreactreducer add sub reset ....`  
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
    The only needed thing is implement your actions in `reducer/index.js` and edit the test action accordingly, then just test the `test/index.spec.js`. For further actions You can rely on your AI-revamped c & v talent.  
    Most likely you will never have to edit `reducer/test/index.spec.js`:  
    <details>
    <summary>how the created reducer test looks like?</summary>

    ``` js  
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
    </details>   
    <br/>
3) Proceed implementing the actions functions in the reducer and updating/creating the testcases accordingly  
4) Enjoy how fast You can spot problems and reach 100% coverage.


dinamically loading all the testcases exported through `reducer/test/actions/index.js`.

That's all.
