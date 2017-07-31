import Benchmark from 'benchmark';

import t from '../dist/retag.esm.js';

function randomList(count = 100) {
    const ret = new Array(count);
    
    for (let i = 0; i < count; i++) {
        ret[i] = `Item-${Math.floor(Math.random() * count)}`;
    }

    return ret;
}

const simpleList = new Benchmark({
    name: 'simple-list', 
    setup() {
        this.items = new Array(this.count);
        for (let i = 0; i < this.count; i++) {
            this.items[i] = randomList();
        }
    },
    fn() {
        const items = this.items.pop();
        const root = t.ul(
            items.map(item => t.li([ item ]))
        );
    }
});

const complexList = new Benchmark({
    name: 'complex-list', 
    fn() {
        const items = randomList();
        const noop = () => {};

        const root = t.div([
            t.h1({
                className: 'title',
                style: 'color: red;'
            }, [ 
                'TodoList'
            ]),
            t.ul(
                items.map(item => (
                    t.li({
                        onclick: noop,
                    }, [ 
                        item 
                    ])
                ))
            )
        ]);
    }
});

export const benchmarks = [
    simpleList,
    complexList,
]