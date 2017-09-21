var build = require('./install').build
module.exports = exports = function(config) {
    var fs = require('fs')
    var exec = require('child_process').exec
    var EZY_HOME = config.ezy_home
    fs.stat(`${EZY_HOME}`, (err, stat) => {
        config.log(`EZY Rebuilding ...`)
        if (err) {
            exec(`ezy install`, (err, stdout, stderr) => {
                if (err) config.log(err)
                else if (stderr) config.log(config.chalk.red(stderr.trim()))
                else config.log(stdout.trim())
            })
        }
        else build(config, EZY_HOME)
    })
}
