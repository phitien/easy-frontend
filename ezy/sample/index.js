try {
    let fs = require('fs')
    fs.statSync(process.env.EZY_HOME)
    var sep = require('path').sep == '\\' ? ';' : ':'
    process.env.NODE_PATH = `.${sep}${process.env.NODE_PATH || '.'}${sep}./node_modules${sep}${process.env.EZY_HOME}`
    require('module').Module._initPaths()

    require('babel-register')({presets: ['es2015']})
    require('./app')
}
catch(e) {
    console.log(`Could not find ezy framework at: ${process.env.EZY_HOME}`)
    console.log(`Run: npm i -g && ezy install, then start new session`)
}
