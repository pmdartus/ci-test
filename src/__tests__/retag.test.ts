import t from '../retag';

test('render simple element', () => {
    const root = t.h1();
    expect(root).toMatchSnapshot();
});

test('render simple element', () => {
    const root = t.h1(['Hello world'])
    expect(root).toMatchSnapshot();
});

test('render nested children', () => {
    const items = ['foo', 'bar', 'baz'];
    const root = t.ul(
        items.map(content => t.li([ content ]))
    );

    expect(root).toMatchSnapshot();
});

test('render attributes', () => {
    const root = t.h1({
        className: 'title',
        style: {
            color: 'red',
        }
    }, [
        'Hello world',
    ]);

    expect(root).toMatchSnapshot();
});