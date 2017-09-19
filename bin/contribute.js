module.exports = exports = function(config) {
    var fs = require('fs')
    const {exec} = require('child_process')
    const push = function () {
        console.log(`EZY Pushing ..., it takes about 5-10 mins to finished process`)
        exec(`cd ${process.env.HOME}/${config.EZY_HOME} && git add . && git commit -am "${config.argv.find('-m') || 'Auto message'}" && git push`, (err, stdout, stderr) => {
            if (err) console.log(`EZY Error: Could not push to repo`, err)
            console.log(stdout.trim())
            console.log(stderr.trim())
            console.log(`EZY is pushed`)
            process.exit(0)
        })
    }
    fs.stat(`${process.env.HOME}/${config.EZY_HOME}`, (err, stat) => {
        if (err) {
            console.log(`EZY Error: ${process.env.HOME}/${config.EZY_HOME} not found`)
            process.exit(0)
        }
        else {
            push()
        }
    })
}
