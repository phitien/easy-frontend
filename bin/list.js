module.exports = exports = function(setting) {
    var exec = require('child_process').exec
    exec(`gulp --tasks`, (err, stdout, stderr) => {
        if (err) setting.log(`EZY Error: Could not list`, err)
        else if (stderr) setting.log(setting.chalk.red(stderr.trim()))
        else setting.log(
            stdout.replace(/\[.*\]\s*/g, '')
                .replace(/^.*\n/g, '')
                .replace(/^.*\n/g, '')
                .trim()
        )
    })
}
