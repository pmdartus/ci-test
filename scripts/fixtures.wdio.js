const path = require('path');

const APP_PORT = 8080;
const {
    USE_SAUCE,
    SAUCE_USERNAME,
    SAUCE_ACCESS_KEY,
    TRAVIS_JOB_NUMBER,
} = process.env;

const resolve = (...args) => (
    path.resolve(__dirname, ...args)
);

const config = {
    host: '0.0.0.0',
    port: 4444,
    
    specs: [
        resolve('../fixtures/**/__spec__/*.test.js'),
    ],
    
    maxInstances: 10,
    capabilities: [],
    
    sync: true,
    coloredLogs: true,
    bail: 0,
    
    screenshotPath: resolve('../test/screenshoots'),
    
    baseUrl: `http://localhost:${APP_PORT}`,
    waitforTimeout: 1000,
    
    framework: 'mocha',
    reporters: ['dot'],

    services: ['static-server'],
    staticServerPort: APP_PORT,
    staticServerFolders: [
        { mount: '/', path: resolve('../fixtures') }
    ]
};

if (USE_SAUCE && SAUCE_USERNAME && SAUCE_ACCESS_KEY) {
    config.services.push('sauce');

    const isSauceConnectRunning = !!TRAVIS_JOB_NUMBER;
    
    Object.assign(config, {
        user: process.env.SAUCE_USERNAME,
        key: process.env.SAUCE_ACCESS_KEY,
        sauceConnect: !isSauceConnectRunning,
    });

    // Necessary to reroute the requests through the sauce lab proxy
    // https://docs.travis-ci.com/user/sauce-connect/
    // http://webdriver.io/guide/usage/cloudservices.html#With-Travis-CI
    if (TRAVIS_JOB_NUMBER) {
        config.capabilities.forEach(capability => {
            capability['tunnel-identifier'] = TRAVIS_JOB_NUMBER;
        });
    }
} else {
    config.services.push('selenium-standalone');

    config.capabilities.push({
        browserName: 'chrome',
        chromeOptions: {
            args: ['--headless', '--disable-gpu'],
        }
    });
}

exports.config = config;