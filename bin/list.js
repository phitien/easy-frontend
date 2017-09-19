module.exports = exports = function(config) {
    const {exec} = require('child_process')
    exec(`gulp --tasks`, (err, stdout, stderr) => {
        if (err) console.log(err.trim())
        if (stderr) console.log(stderr.trim())
        console.log(
            stdout.replace(/\[.*\]\s*/g, '')
                .replace(/^.*\n/g, '')
                .replace(/^.*\n/g, '')
                .trim()
        )
        process.exit(0)
    })
}
