const CDP = require('chrome-remote-interface');
const chromeLauncher = require('chrome-launcher');

const js = `
(async () => {
    const bundles = [{
        label: 'base',
        benchmarks: loadBenchmarks('dist/benchmarks.js').benchmarks,
    }, {
        label: 'target',
        benchmarks: loadBenchmarks('dist/benchmarks.js').benchmarks,
    }];

    const results = [];
    for (let suite of bundlesToSuites(bundles)) {
        const res = await run(suite);
        results.push(res);
    }
    return results;
})();
`

function launchChrome(headless=true) {
  return chromeLauncher.launch({
    chromeFlags: [
      '--disable-gpu',
      headless ? '--headless' : ''
    ]
  });
}

function loadPage(protocol, url) {
    const { Page } = protocol;
    Page.navigate({ url });

    return new Promise(resolve => (
        Page.loadEventFired(resolve)
    ));
}

launchChrome().then(async chrome => {
    const protocol = await CDP({port: chrome.port});
    
    const { Page, Runtime, Console } = protocol;
    await Promise.all([
        Page.enable(), 
        Runtime.enable(),
        Console.enable(),
    ]);

    Console.messageAdded(value => {
        const { level, text } = value.message;
        console[level](text);
    })

    await loadPage(protocol, 'file:///Users/p.dartus/code/_tmp/travis-test/performance/index.html');

    const { result, exceptionDetails } = await Runtime.evaluate({
        expression: js,
        awaitPromise: true,
        returnByValue: true,
    });

    console.log(exceptionDetails)

    console.log(JSON.stringify(result.value, null, 4));

    protocol.close();
    chrome.kill();
});