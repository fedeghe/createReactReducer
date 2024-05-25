const path = require('path'),
    fs = require('fs'),
    execPath = process.cwd(),
    actions = process.argv.slice(2),
    tplsPath = `${__dirname}/tpls`,
    trgs = ['reducer', 'actions', 'test', 'actiontest', 'actiontestIndex'],
    tpls = trgs.reduce((acc,t) => {
        acc[t] = fs.readFileSync(`${tplsPath}/${t}.tpl.js`).toString();
        return acc;
    }, {}),
    reducerFolder = `${execPath}/reducer`;

if (!actions.length) {
    console.log(`Provide as parameter at least one named action
> createReactReducer add`)
    return;
}


function createReducerFolder() {
    if (fs.existsSync(reducerFolder)) {
        fs.rmSync(reducerFolder, {recursive: true})
    }
    fs.mkdirSync(reducerFolder);
    fs.mkdirSync(`${reducerFolder}/test`);
    fs.mkdirSync(`${reducerFolder}/test/actions`);
}
const uc = s => s.toUpperCase()
createReducerFolder();

const runners = {
    reducer: (tpl) => {
        const content = tpl
            .replace(
                /\/\/ACTIONS/,
                actions.map(action => {
                    const A = uc(action);
                    return `[ACTIONS.${A}]: ({ oldState, payload }) => ({ ...oldState, ...payload })`
                }).join(`,\n\t\t`)
            )
        fs.writeFileSync(`${reducerFolder}/index.js`, content);
    },
    actions: tpl => {
        const top = actions.map(action => {
            const A = uc(action)
            return `export const ${A} = Symbol('${A} description here')`
        }).join(`;\n`)
        const exp = `export default {\n\t${actions.map(a => uc(a)).join(`,\n\t`)},\n}`
        const content = tpl 
            .replace(/\/\/ACTIONS/, top)
            .replace(/\/\/EXPORTS/, exp)
        fs.writeFileSync(`${reducerFolder}/actions.js`, content);
    },
    test: tpl => {
        fs.writeFileSync(`${reducerFolder}/test/index.test.js`, tpl);
    },
}

trgs.forEach(t => t in runners && runners[t](tpls[t]))


// create test actons files
actions.forEach(action => {
    fs.writeFileSync(
        `${reducerFolder}/test/actions/${action}.js`,
        tpls.actiontest
            .replace(/ACTION/gm, uc(action))
    );
});

// write exported index
fs.writeFileSync(
    `${reducerFolder}/test/actions/index.js`,
    tpls.actiontestIndex
        .replace(
            /\/\/IMPORTS/,
            actions.map(
                action => `import ${uc(action)} from './${action}.js';`
            ).join(`\n`)
        )
        .replace(
            /\/\/EXPORTS/,
            `export default {${actions.map(uc).join(', ')}};`
        )
);
