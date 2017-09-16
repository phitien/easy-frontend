'use strict';

process.env.EASY_HOME = __dirname
process.env.NODE_PATH = `.:${process.env.NODE_PATH || ''}:${process.env.EASY_HOME}`
require('module').Module._initPaths()

require('babel-register')({presets: ['es2015']})
require('./app')
