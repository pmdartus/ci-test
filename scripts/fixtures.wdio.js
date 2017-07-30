const path = require('path');

const APP_PORT = 8080;
const {
    SAUCE_USERNAME,
    SAUCE_ACCESS_KEY
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
    capabilities: [{
        browserName: 'chrome'
    }],
    
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

if (SAUCE_USERNAME && SAUCE_ACCESS_KEY) {
    config.services.push('sauce');
    
    Object.assign(config, {
        user: process.env.SAUCE_USERNAME,
        key: process.env.SAUCE_ACCESS_KEY,
        sauceConnect: true,
    });

    config.capabilities.push({
        browserName: 'firefox'
    });
} else {
    config.services.push('selenium-standalone');
}

exports.config = config;