module.exports = exports = function(config) {
    var exec = require('child_process').exec
    config.log(`EZY Removing ...`)
    exec(`rm -rf ${config.ezy_home}`, (err, stdout, stderr) => {
        if (err) config.log(`EZY Error: Could not uninstall ezy`, err)
        else if (stderr) config.log(config.chalk.red(stderr.trim()))
        else config.log(`EZY Done Removing`)
    })
}
