'use strict';

process.env.EZY_HOME = __dirname
process.env.NODE_PATH = `.:${process.env.NODE_PATH || ''}:.:node_modules:${process.env.EZY_HOME}`
require('module').Module._initPaths()

require('babel-register')({presets: ['es2015']})
require('./app')
