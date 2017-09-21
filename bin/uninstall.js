module.exports = exports = function(setting) {
    var exec = require('child_process').exec
    setting.log(`EZY Removing ...`)
    exec(`rm -rf ${setting.ezy_home}`, (err, stdout, stderr) => {
        if (err) setting.log(`EZY Error: Could not uninstall ezy`, err)
        else if (stderr) setting.log(setting.chalk.red(stderr.trim()))
        else setting.log(`EZY Done Removing`)
    })
}
