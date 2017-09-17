module.exports = exports = function(config) {
    const {exec} = require('child_process')
    console.log(`EZY Removing ...`)
    exec(`rm -rf ${process.env.HOME}/${config.EZY_HOME}`, (err, stdout, stderr) => {
        console.log(`EZY Done Removing`)
        process.exit(0)
    })
}
