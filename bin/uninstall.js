module.exports = exports = function(config) {
    const {exec} = require('child_process')
    config.setting.log(`EZY Removing ...`)
    exec(`rm -rf ${process.env.HOME}/${config.EZY_HOME}`, (err, stdout, stderr) => {
        config.setting.log(`EZY Done Removing`)
    })
}
