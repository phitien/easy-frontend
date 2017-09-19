module.exports = exports = function(config) {
    const {exec} = require('child_process')
    var verify = require('../ezygulp/verify')
    var help = require('./help')

    //verify ezy path
    if (!verify(config)) return

    var tasks = config.setting.argv.tasks()
    if (tasks.length) {
        function run() {
            var cmd = `gulp ${config.setting.argv().join(' ')}`
            var start = new Date()
            config.setting.log(config.setting.chalk.cyan(`EZY Starting:.. ${config.setting.argv().join(' ')}`))
            exec(`gulp ${config.setting.argv().join(' ')}`, (err, stdout, stderr) => {
                if (err) return config.setting.log(config.setting.chalk.red(err))
                var end = new Date()
                if (stderr) config.setting.log(config.setting.chalk.red(stderr))
                else config.setting.log(config.setting.chalk.cyan(`EZY Finished after ${(((end - start) % 60000) / 1000).toFixed(0)}s`))
            })
        }
        function invalid(task) {
            config.setting.log(config.setting.chalk.red(`EZY Error:`), config.setting.chalk.cyan(`task '${task}' is not defined at this path: ${process.env.PWD}`))
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
