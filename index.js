process.env.EZY_HOME = __dirname
var sep = require('path').sep == '\\' ? ';' : ':'
process.env.NODE_PATH = `.${sep}${process.env.NODE_PATH || '.'}${sep}./node_modules${sep}${process.env.EZY_HOME}`
require('module').Module._initPaths()

require('babel-register')({presets: ['env']})
require('./app')
