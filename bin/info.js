module.exports = exports = function(setting) {
    var exec = require('child_process').exec
    exec(`gulp info`, (err, stdout, stderr) => {
        if (err) setting.log(`EZY Error: Could not get info`, err)
        else if (stderr) setting.log(setting.chalk.red(stderr.trim()))
        else setting.log(
            stdout.replace(/\[.*\]\s*/g, '')
                .replace(/^.*\n/g, '')
                .replace(/^.*\n/g, '')
                .trim()
        )
    })
}
