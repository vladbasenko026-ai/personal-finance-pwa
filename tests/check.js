const fs = require('node:fs');
const assert = require('node:assert/strict');

const html = fs.readFileSync('src/index.html', 'utf8');

assert.ok(html.includes('Personal Finance PWA'));
assert.ok(html.includes('id="amount"'));
assert.ok(html.includes('function addTransaction()'));
assert.ok(html.includes('id="transactions"'));

console.log('All checks passed successfully!');
