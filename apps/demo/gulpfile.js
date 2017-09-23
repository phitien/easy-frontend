try {
    var fs = require('fs')
    fs.statSync(process.env.EZY_HOME)
    var sep = require('path').sep == '\\' ? ';' : ':'
    process.env.NODE_PATH = `.${sep}${process.env.NODE_PATH || '.'}${sep}./node_modules${sep}${process.env.EZY_HOME}`
    require('module').Module._initPaths()

    var gulp = require('gulp')
    var {apptasks} = require('ezygulp')
    apptasks(require('./gulp'), gulp)
}
catch(e) {
    console.log(`Could not find ezy framework at: ${process.env.EZY_HOME}`)
    console.log(`Run: ezy install, then start new session`)
    console.log(e)
}
