const fs = require('fs');
const path = require('path');
const typescript = require('rollup-plugin-typescript2');

module.exports = {
    entry: path.resolve(__dirname, '../src/retag.ts'),
    plugins: [
        typescript(),
    ],
    moduleName: 'retag',
    targets: [{
        dest: path.resolve(__dirname, '../dist/retag.esm.js'),
        format: 'es',
    }, {
        dest: path.resolve(__dirname, '../dist/retag.js'),
        format: 'umd',
    }],
};