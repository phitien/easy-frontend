#!/usr/bin/env node
var fs = require('fs')
var version = require('./version')
var help = require('./help')
var install = require('./install')
var uninstall = require('./uninstall')
var rebuild = require('./rebuild')
var argv = process.argv.slice(2).sort((a,b) => a < b)

var config = {EZY_HOME: '.ezy', version: '1.0.0', argv: argv}

const {exec} = require('child_process')

//Show current version
if (argv.find(i => i == '-v' || i == '--v' || i == '-version' || i == '--version')) version(config)
//List all commands
else if (argv.length == 0 || argv.find(i => i == '-?' || i == '--?' || i == '-help' || i == '--help')) help(config)
//install command implementation
else if (argv.find(i => i == 'install' || i == 'i' || i == 'update' || i == 'u')) install(config)
//rebuild command implementation
else if (argv.find(i => i == 'rebuild' || i == 'r')) rebuild(config)
//uninstall command implementation
else if (argv.find(i => i == 'uninstall' || i == 'un')) uninstall(config)
//push command implementation
else if (argv.find(i => i == 'push' || i == 'p')) push(config)
//Commands implementations
else {
    //Show warning about incorrect path
    if (!process.env.EZY_HOME) {
        console.log(`EZY_HOME is not defined, eg: ${process.env.HOME}/${config.EZY_HOME}`)
        console.log(`Try to run export EZY_HOME=${process.env.HOME}/${config.EZY_HOME} && ezy ${process.argv.slice(2).join(' ')}`)
        console.log(`Or run: ezy install or ezy i`)
        process.exit(0)
    }
    //Verify EZY_HOME
    fs.stat(process.env.EZY_HOME, (err, stat) => {
        if (err) {
            console.log(`EZY Error: Could not find ezy framework at ${process.env.EZY_HOME}`)
            console.log(`Try to run: ezy install or ezy i`)
            process.exit(0)
        }
        else {
            var sep = require('path').sep == '\\' ? ';' : ':'
            process.env.NODE_PATH = `.${sep}${process.env.NODE_PATH || '.'}${sep}node_modules${sep}${process.env.EZY_HOME}`
            require('module').Module._initPaths()

            var polish = require('ezy/gulp/polish')
            var setting = {}
            polish(setting)

            var cmd = `gulp ${setting.argv().join(' ')}`
            var start = new Date()
            setting.log(setting.chalk.cyan(`EZY Starting:.. ${setting.argv().join(' ')}`))
            exec(`source ~/.bash_profile && cd ${process.env.EZY_HOME} && gulp ${setting.argv().join(' ')}`, (err, stdout, stderr) => {
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
    })
}
