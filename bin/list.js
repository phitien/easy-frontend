module.exports = exports = function(config) {
    var exec = require('child_process').exec
    exec(`gulp --tasks`, (err, stdout, stderr) => {
        if (err) config.log(`EZY Error: Could not list`, err)
        else if (stderr) config.log(config.chalk.red(stderr.trim()))
        else config.log(
            stdout.replace(/\[.*\]\s*/g, '')
                .replace(/^.*\n/g, '')
                .replace(/^.*\n/g, '')
                .trim()
        )
    })
}
