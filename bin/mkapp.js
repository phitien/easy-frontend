module.exports = exports = function(config) {
    var fs = require('fs')
    var exec = require('child_process').exec
    var names = config.argv.tasks()
    names.shift()
    var readline = require('readline')
    var rl = readline.createInterface(process.stdin, process.stdout)
    var dir = config.ezy ? config.ezy_apps : config.argv('dir|d', config.pwd)
    function doJob() {
        if (!names.length) process.exit(0)
        var name = names.shift()
        config.log(`Creating app: ${name} ...`)
        var appname = name.replace(/\W/g, '')
        var path = `${dir}/${appname}`
        if (appname) fs.stat(`${path}`, function(err, stat) {
            if (!err) {
                config.log(config.chalk.red(`App '${appname}' already exists at ${path}`))
                doJob()
            }
            else exec(`cd ${config.ezy_home} && gulp mkapp -name="${name}" -dir="${dir}"`, (err, stdout, stderr) => {
                if (err) {
                    config.log(`EZY Error: Could not create app '${name}' at ${dir}`, err)
                    doJob()
                }
                else if (stderr) {
                    config.log(config.chalk.red(stderr.trim()))
                    doJob()
                }
                else exec(`cd "${dir}/${appname}" && npm install`, (err, stdout, stderr) => {
                    if (err) config.log(err)
                    else if (stderr) config.log(config.chalk.red(stderr.trim()))
                    config.log(`App '${name}' is created at '${dir}/${appname}'`)
                    doJob()
                })
            })
        })
        else {
            config.log(config.chalk.red(`Name '${appname}' is incorrect, it should not be empty and contain alphabets or number only`))
            doJob()
        }
    }
    function askForNames() {
        var prompt = `Please enter name(s) separated by space(s): `
        rl.setPrompt(prompt)
        rl.prompt()
        rl.on('line', function(line) {
            names = line.split(' ').filter(n => n)
            if (!names.length) config.log(prompt)
            else rl.close()
        })
        .on('close', doJob)
    }
    if (!names.length) askForNames()
    else doJob()
}
