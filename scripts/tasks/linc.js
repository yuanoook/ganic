/**
 * Based on similar script in React
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';
/* eslint-disable no-console */

const runESLint = require('../eslint');

console.log('Linting changed files...');

if (runESLint({onlyChanged: true})) {
  console.log('Lint passed for changed files.');
} else {
  console.log('Lint failed for changed files.');
  process.exit(1);
}
