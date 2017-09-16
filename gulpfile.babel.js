'use strict';

process.env.EASY_HOME = __dirname
process.env.NODE_PATH = `.:${process.env.NODE_PATH || ''}:${process.env.EASY_HOME}`
require('module').Module._initPaths()

import gulp from 'gulp'

require('easy/gulp/apps').default({}, gulp)

try {require('easy/gulp').default(require('./easy/apps/demo/gulp').default, gulp, true)} catch(e) {console.log(e)}
/**NEWAPP**/
