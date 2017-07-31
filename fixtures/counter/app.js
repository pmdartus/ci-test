import t from '../../dist/retag.esm.js';

let value = 0;
const counterSpan = t.span({ 
    id: 'counter' 
}, [ 
    value
]);

function increment() {
    counterSpan.innerText = ++value;
}

function decrement() {
    counterSpan.innerText = --value;
}

const counter = t.div([
    t.p([
        'Counter value: ',
        counterSpan,
    ]),
    t.button({
        onclick: increment
    }, [
        '+'
    ]),
    t.button({
        onclick: decrement
    }, [
        '-'
    ]),
])

document.body.appendChild(counter);