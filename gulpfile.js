var gulp = require('gulp')
var {common, apptasks} = require('./ezygulp')
var config = {}
if (!process.env.EZY_HOME || process.env.EZY_HOME != __dirname) {
    process.env.EZY_HOME = __dirname
    common(config, gulp)
    const {exec} = require('child_process')
    exec(`cat ~/.bash_profile | sed '/EZY_HOME/d' 2>&1 | tee ~/.bash_profile && echo export EZY_HOME="$(pwd)" >> ~/.bash_profile`, (err, stdout, stderr) => {
        exec(`cat ~/.bash_profile | grep EZY_HOME`, (err, stdout, stderr) => {
            if (stdout.trim()) config.log(`EZY_HOME is set, please run: source ~/.bash_profile`)
            else config.log(`EZY_HOME is not set`)
        })
    })
}
else {
common(config, gulp)
var sep = require('path').sep == '\\' ? ';' : ':'
process.env.EZY_HOME = __dirname
process.env.NODE_PATH = `.${sep}${process.env.NODE_PATH || '.'}${sep}./node_modules${sep}${process.env.EZY_HOME}`
require('module').Module._initPaths()
/**NEWAPP**/
}
