#!/usr/bin/env node
let config = {EZY_HOME: '.ezy', version: '1.0.0'}
let fs = require('fs')
let version = require('./version')
let help = require('./help')
let install = require('./install')
let uninstall = require('./uninstall')
let rebuild = require('./rebuild')

let argv = process.argv.slice(2).sort((a,b) => a < b)

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
            console.log(`EZY_HOME: ${process.env.EZY_HOME}`)
            process.env.NODE_PATH = `.:${process.env.NODE_PATH || ''}:.:node_modules:${process.env.EZY_HOME}`
            require('module').Module._initPaths()

            let polish = require('ezy/gulp/polish')
            let setting = {}
            polish(setting)

            let cmd = `gulp ${setting.argv().join(' ')}`
            let start = new Date()
            setting.log(setting.chalk.cyan(`EZY Starting:.. ${setting.argv().join(' ')}`))
            exec(`source ~/.bash_profile && cd ${process.env.EZY_HOME} && gulp ${setting.argv().join(' ')}`, (err, stdout, stderr) => {
                if (err) {
                    setting.log(setting.chalk.red(err))
                    process.exit(0)
                    return
                }
                let end = new Date()
                if (stderr) setting.log(setting.chalk.red(stderr))
                else setting.log(setting.chalk.cyan(`EZY Finished after ${(((end - start) % 60000) / 1000).toFixed(0)}s`))
                process.exit(0)
            })
        }
    })
}
