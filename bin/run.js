module.exports = exports = function(config) {
    var exec = require('child_process').exec
    var verify = require('../ezygulp/verify')
    var help = require('./help')

    //verify ezy path
    if (!verify(config)) return

    var tasks = config.argv.tasks()
    if (tasks.length) {
        function run() {
            var cmd = `gulp ${config.argv().join(' ')}`
            var start = new Date()
            config.log(config.chalk.cyan(`EZY Starting:.. ${config.argv().join(' ')}`))
            exec(`gulp ${config.argv().join(' ')}`, (err, stdout, stderr) => {
                var end = new Date()
                if (err) config.log(`EZY Error: Could not run command ${config.argv().join(' ')}`, err)
                else if (stderr) config.log(config.chalk.red(stderr.trim()))
                else config.log(config.chalk.cyan(`EZY Finished after ${(((end - start) % 60000) / 1000).toFixed(0)}s`))
            })
        }
        function invalid(task) {
            config.log(config.chalk.red(`EZY Error:`), config.chalk.cyan(`task '${task}' is not defined at this path: ${process.env.PWD}`))
        }
        function loop() {
            if (!tasks.length) return run()
            var task = tasks.pop()
            if (!task) return invalid(task)
            exec(`gulp --tasks | grep ${task} -w`, (err, stdout, stderr) => {
                if (err || !stdout || stderr) return invalid(task)
                return loop()
            })
        }
        loop()
    }
    else return help(config)
}
