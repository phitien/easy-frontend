module.exports = exports = function(config) {
    const {exec} = require('child_process')
    console.log(`EZY Removing ..., path: ${process.env.HOME}/${config.EZY_HOME}`)
    exec(`cd ${process.env.HOME}/${config.EZY_HOME} && npm uninstall -g ezy`, (err, stdout, stderr) => {
        exec(`rm -rf ${process.env.HOME}/${config.EZY_HOME} && rm -rf $(which ezy)`, (err, stdout, stderr) => {
            console.log(`EZY Done Removing`)
            process.exit(0)
        })
    })
}
