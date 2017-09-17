'use strict';

process.env.EZY_HOME = process.env.EZY_HOME || `${process.env.HOME}/ezy`
process.env.NODE_PATH = `.:${process.env.NODE_PATH || ''}:${process.env.EZY_HOME}`
require('module').Module._initPaths()

require('babel-register')({presets: ['es2015']})
require('./app')
