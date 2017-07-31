const fs = require('fs');
const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, '../performance/benchmarks.js'),
    dest: path.resolve(__dirname, '../performance/dist/benchmarks.js'),
    
    external: [ 'benchmark' ],
    globals: { benchmark: 'Benchmark' },

    moduleName: 'retagBenchmarks',
    format: 'umd',
};