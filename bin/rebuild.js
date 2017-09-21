var build = require('./install').build
module.exports = exports = function(setting) {
    var fs = require('fs')
    var exec = require('child_process').exec
    var EZY_HOME = setting.ezy_home
    fs.stat(`${EZY_HOME}`, (err, stat) => {
        setting.log(`EZY Rebuilding ...`)
        if (err) {
            exec(`ezy install`, (err, stdout, stderr) => {
                if (err) setting.log(err)
                else if (stderr) setting.log(setting.chalk.red(stderr.trim()))
                else setting.log(stdout.trim())
            })
        }
        else build(setting, EZY_HOME)
    })
}
