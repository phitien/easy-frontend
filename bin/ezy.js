#!/usr/bin/env node
var fs = require('fs')
var gulp = require('gulp')

var argv = require('../ezygulp/argv')
var verify = require('../ezygulp/verify')

var version = require('./version')
var help = require('./help')
var install = require('./install')
var uninstall = require('./uninstall')
var rebuild = require('./rebuild')
var contribute = require('./contribute')
var init = require('./init')
var info = require('./info')
var list = require('./list')

var config = {EZY_HOME: '.ezy', version: '1.0.0', argv: argv}

const {exec} = require('child_process')

//Show current version
if (argv.has('v|version')) version(config)
//List all commands
else if (argv.hasOption('\\?') || argv.has('help')) help(config)
//install command implementation
else if (argv.has('install|update|i|u')) install(config)
//rebuild command implementation
else if (argv.has('rebuild|repair|r')) rebuild(config)
//uninstall command implementation
else if (argv.has('uninstall|remove|un|rm')) uninstall(config)
//push command implementation
else if (argv.has('contribute|c')) contribute(config)
//push command implementation
else if (argv.empty() || argv.has('init') || argv.hasTask('init')) init(config)
//push command implementation
else if (argv.has('info')) info(config)
//push command implementation
else if (argv.has('list|ls')) list(config)
//Commands implementations
else {
    //verify ezy path
    if (!verify(config)) process.exit(0)

    var polish = require('../ezygulp/polish')
    var setting = {}
    polish(setting, gulp)

    var tasks = setting.argv.tasks()
    if (tasks && tasks.length) {
        function run() {
            var cmd = `gulp ${setting.argv().join(' ')}`
            var start = new Date()
            setting.log(setting.chalk.cyan(`EZY Starting:.. ${setting.argv().join(' ')}`))
            exec(`gulp ${setting.argv().join(' ')}`, (err, stdout, stderr) => {
                if (err) {
                    setting.log(setting.chalk.red(err))
                    process.exit(0)
                    return
                }
                var end = new Date()
                if (stderr) setting.log(setting.chalk.red(stderr))
                else setting.log(setting.chalk.cyan(`EZY Finished after ${(((end - start) % 60000) / 1000).toFixed(0)}s`))
                process.exit(0)
            })
        }
        function invalid(task) {
            setting.log(setting.chalk.red(`EZY Error:`), setting.chalk.cyan(`task '${task}' is not defined at this path: ${process.env.PWD}`))
            process.exit(0)
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
    else help(config)
}
