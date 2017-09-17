module.exports = exports = function() {
    let polish = require('ezy/gulp/polish')
    let setting = {}

    polish(setting)

    const {exec} = require('child_process')

    let cmd = `gulp ${setting.argv().join(' ')}`
    let start = new Date()
    setting.log(setting.chalk.cyan(`EZY Starting... ${setting.argv().join(' ')}`))
    exec(`gulp ${setting.argv().join(' ')}`, (err, stdout, stderr) => {
        if (err) return
        let end = new Date()
        if (stderr) setting.log(setting.chalk.red(stderr))
        else setting.log(setting.chalk.cyan(`EZY Finished after ${(((end - start) % 60000) / 1000).toFixed(0)}s`))
    })
}
