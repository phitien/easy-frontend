module.exports = exports = function(config) {
    if (!process.env.EZY_HOME) {
        var EZY_HOME = config && config.EZY_HOME ? config.EZY_HOME : '.ezy'
        console.log(`EZY_HOME is not defined, eg: ${process.env.HOME}/${EZY_HOME}`)
        console.log(`cat ~/.bash_profile | sed '/EZY_HOME/d' | tee ~/.bash_profile && echo 'export EZY_HOME="$HOME/${EZY_HOME}"' >> ~/.bash_profile`)
        console.log(`Or run: ezy install or ezy i`)
        process.exit(0)
        return
    }
    var sep = require('path').sep == '\\' ? ';' : ':'
    process.env.NODE_PATH = `.${sep}${process.env.NODE_PATH || '.'}${sep}./node_modules${sep}${process.env.EZY_HOME}`
    require('module').Module._initPaths()
    return true
}
