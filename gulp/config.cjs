/*jshint module: false, strict: global */
'use strict';

const fs = require('node:fs');
const path = require('node:path');

let config;

if (fs.existsSync('.buildconfig.json')) {
    config = JSON.parse(fs.readFileSync('.buildconfig.json').toString());
} else if (fs.existsSync('.buildconfig.cjs')) {
    config = require(path.resolve('.buildconfig.cjs'));
} else {
    config = {};
}

module.exports = config;
