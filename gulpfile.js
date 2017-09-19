var sep = require('path').sep == '\\' ? ';' : ':'
process.env.EZY_HOME = __dirname
process.env.NODE_PATH = `.${sep}${process.env.NODE_PATH || '.'}${sep}./node_modules${sep}${process.env.EZY_HOME}`
require('module').Module._initPaths()

var gulp = require('gulp')
var {common, apptasks} = require('ezygulp')
var setting = {}
common(setting, gulp)
try {apptasks(require('ezy/apps/demo/gulp'), require('gulp'))} catch(e) {console.log(e)}
/**NEWAPP**/
