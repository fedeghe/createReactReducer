# Create react reducer

Install globally
```
yarn global add createreactreducer
```

---
Use it  
- move to the folder where you want to create a new reducer  
- run `createreactreducer add sub reset ....`

here `add sub reset` is just an example.  

It will create thise tree actions `ADD, SUB, RESET` and all related smart test.  
The only needed thing is implement your actions and edit the test action accordingly, then just test the `test/index.spec.js`