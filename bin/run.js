module.exports = exports = function(setting) {
    var exec = require('child_process').exec
    var verify = require('../ezygulp/verify')
    var help = require('./help')

    //verify ezy path
    if (!verify(setting)) return

    var tasks = setting.argv.tasks()
    if (tasks.length) {
        function run() {
            var cmd = `gulp ${setting.argv().join(' ')}`
            var start = new Date()
            setting.log(setting.chalk.cyan(`EZY Starting:.. ${setting.argv().join(' ')}`))
            exec(`gulp ${setting.argv().join(' ')}`, (err, stdout, stderr) => {
                var end = new Date()
                if (err) setting.log(`EZY Error: Could not run command ${setting.argv().join(' ')}`, err)
                else if (stderr) setting.log(setting.chalk.red(stderr.trim()))
                else setting.log(setting.chalk.cyan(`EZY Finished after ${(((end - start) % 60000) / 1000).toFixed(0)}s`))
            })
        }
        function invalid(task) {
            setting.log(setting.chalk.red(`EZY Error:`), setting.chalk.cyan(`task '${task}' is not defined at this path: ${process.env.PWD}`))
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
    else return help(setting)
}
