'use strict';

process.env.EZY_HOME = process.env.EZY_HOME || `${process.env.HOME}/ezy`
process.env.NODE_PATH = `.:${process.env.NODE_PATH || ''}:.:node_modules:${process.env.EZY_HOME}`
require('module').Module._initPaths()

let {apptasks} = require('ezy/gulp')

apptasks(require('./gulp'))
