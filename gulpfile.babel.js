try {
    let fs = require('fs')
    fs.statSync(process.env.EZY_HOME)
    console.log(`EZY_HOME: ${process.env.EZY_HOME}`)
    process.env.NODE_PATH = `.:${process.env.NODE_PATH || ''}:.:node_modules:${process.env.EZY_HOME}`
    require('module').Module._initPaths()
    let {common, apptasks} = require('ezy/gulp')
    common()
    /**NEWAPP**/
}
catch(e) {
    console.log(`Could not find ezy framework at: ${process.env.EZY_HOME}`)
    console.log(`Run: npm i -g && ezy install, then start new session`)
}
