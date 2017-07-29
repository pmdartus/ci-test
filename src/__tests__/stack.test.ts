import Stack from '../stack';

test('peek retrieves last inserted item', () => {
    const stack = new Stack();
    expect(stack.peek()).toBeUndefined();

    stack.push(1);
    stack.push(2);
    stack.push(3);
    expect(stack.peek()).toBe(3);
});

test('size returns the number of element present in the stack', () => {
    const stack = new Stack();
    expect(stack.size).toBe(0);

    stack.push(1);
    stack.push(2);
    stack.push(3);

    expect(stack.size).toBe(3);
});

test('pop remove the last element of the stack', () => {
    const stack = new Stack();

    stack.push(1);
    stack.push(2);
    expect(stack.size).toBe(2);

    const popped = stack.pop();
    expect(popped).toBe(2);
    expect(stack.size).toBe(1);
});