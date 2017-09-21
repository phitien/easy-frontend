module.exports = exports = function(config) {
    var fs = require('fs')
    var exec = require('child_process').exec
    const push = function () {
        config.log(`EZY Pushing ..., it takes about 5-10 mins to finished process`)
        exec(`cd ${config.ezy_home} && git add . && git commit -am "${config.argv.find('-m') || 'Auto message'}" && git push`, (err, stdout, stderr) => {
            if (err) config.log(`EZY Error: Could not push to repo`, err)
            else if (stderr) config.log(config.chalk.red(stderr.trim()))
            else {
                config.log(stdout.trim())
                config.log(`EZY is pushed`)
            }
        })
    }
    fs.stat(`${config.ezy_home}`, (err, stat) => {
        if (err) return config.log(`EZY Error: ${config.ezy_home} not found`)
        else return push()
    })
}
