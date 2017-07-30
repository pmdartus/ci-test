const fs = require('fs');
const path = require('path');

const FIXTURES_DIR = path.resolve(__dirname, '../fixtures');
const FIXTURE_ENTRY = 'app.js';
const FIXTURE_DIST = 'dist/bundle.js';

module.exports = fs.readdirSync(FIXTURES_DIR).map(fixture => ({
  entry: path.resolve(FIXTURES_DIR, fixture, FIXTURE_ENTRY),
  dest: path.resolve(FIXTURES_DIR, fixture, FIXTURE_DIST),
  format: 'iife',
}))