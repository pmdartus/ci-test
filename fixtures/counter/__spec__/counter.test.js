const assert = require('assert');

describe('Counter fixture', () => {
    it('should have the right title', () => {
        browser.url('/counter');
        const title = browser.getTitle();
        assert.equal(title, 'Retag - Counter');
    });

    it('should increment counter when clicking on +', () => {
        browser.url('/counter');
        
        const before = browser.getText('#counter');
        assert.equal(before, '0');

        browser.click('button=+');

        const after = browser.getText('#counter');
        assert.equal(after, '1');
    });

    it('should decrement counter when clicking on -', () => {
        browser.url('/counter');
        
        const before = browser.getText('#counter');
        assert.equal(before, '0');

        browser.click('button=-');

        const after = browser.getText('#counter');
        assert.equal(after, '-1');
    });
});