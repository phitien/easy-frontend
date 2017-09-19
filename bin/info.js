module.exports = exports = function(config) {
    const {exec} = require('child_process')
    exec(`gulp info`, (err, stdout, stderr) => {
        if (err) config.setting.log(err.trim())
        if (stderr) config.setting.log(stderr.trim())
        config.setting.log(
            stdout.replace(/\[.*\]\s*/g, '')
                .replace(/^.*\n/g, '')
                .replace(/^.*\n/g, '')
                .trim()
        )
    })
}
