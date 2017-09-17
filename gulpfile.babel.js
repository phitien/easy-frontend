'use strict';

process.env.EASY_HOME = __dirname
process.env.NODE_PATH = `.:${process.env.NODE_PATH || ''}:${process.env.EASY_HOME}`
require('module').Module._initPaths()

import gulp from 'gulp'

let {common, apptasks} = require('easy/gulp')

common({}, gulp)

/**NEWAPP**/
