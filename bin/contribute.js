module.exports = exports = function(config) {
    var fs = require('fs')
    const {exec} = require('child_process')
    const push = function () {
        config.setting.log(`EZY Pushing ..., it takes about 5-10 mins to finished process`)
        exec(`cd ${process.env.HOME}/${config.EZY_HOME} && git add . && git commit -am "${config.argv.find('-m') || 'Auto message'}" && git push`, (err, stdout, stderr) => {
            if (err) config.setting.log(`EZY Error: Could not push to repo`, err)
            config.setting.log(stdout.trim())
            config.setting.log(stderr)
            config.setting.log(`EZY is pushed`)
            return
        })
    }
    fs.stat(`${process.env.HOME}/${config.EZY_HOME}`, (err, stat) => {
        if (err) return config.setting.log(`EZY Error: ${process.env.HOME}/${config.EZY_HOME} not found`)
        else return push()
    })
}
