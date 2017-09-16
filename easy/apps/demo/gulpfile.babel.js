'use strict';

process.env.EASY_HOME = process.env.EASY_HOME || `${process.env.HOME}/easy`
process.env.NODE_PATH = `.:${process.env.NODE_PATH || ''}:${process.env.EASY_HOME}`
require('module').Module._initPaths()

import gulp from 'gulp'

require('easy/gulp').default(require('./gulp').default, gulp)
