'use strict';

process.env.EASY_HOME = process.env.EASY_HOME || `${process.env.HOME}/easy`
process.env.NODE_PATH = `.:${process.env.NODE_PATH || ''}:${process.env.EASY_HOME}`
require('module').Module._initPaths()

require('babel-register')({presets: ['es2015']})
require('./app')
