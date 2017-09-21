module.exports = exports = function(setting) {
    var fs = require('fs')
    var exec = require('child_process').exec
    const push = function () {
        setting.log(`EZY Pushing ..., it takes about 5-10 mins to finished process`)
        exec(`cd ${setting.ezy_home} && git add . && git commit -am "${setting.argv.find('-m') || 'Auto message'}" && git push`, (err, stdout, stderr) => {
            if (err) setting.log(`EZY Error: Could not push to repo`, err)
            else if (stderr) setting.log(setting.chalk.red(stderr.trim()))
            else {
                setting.log(stdout.trim())
                setting.log(`EZY is pushed`)
            }
        })
    }
    fs.stat(`${setting.ezy_home}`, (err, stat) => {
        if (err) return setting.log(`EZY Error: ${setting.ezy_home} not found`)
        else return push()
    })
}
