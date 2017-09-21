module.exports = exports = function(setting) {
    var fs = require('fs')
    var exec = require('child_process').exec
    var names = setting.argv.tasks()
    names.shift()
    var readline = require('readline')
    var rl = readline.createInterface(process.stdin, process.stdout)
    var dir = setting.ezy ? setting.ezy_apps : setting.argv('dir|d', setting.pwd)
    function doJob() {
        if (!names.length) process.exit(0)
        var name = names.shift()
        setting.log(`Removing app: ${name} ...`)
        var appname = name.replace(/\W/g, '')
        var path = `${dir}/${appname}`
        if (appname) fs.stat(`${path}`, function(err, stat) {
            if (!err) exec(`cd ${setting.ezy_home} && gulp rmapp -name="${name}" -dir="${dir}"`, (err, stdout, stderr) => {
                    if (err) setting.log(`EZY Error: Could not remove app '${name}' at ${dir}`, err)
                    else if (stderr) setting.log(setting.chalk.red(stderr.trim()))
                    setting.log(`App '${name}' is removed from '${dir}/${appname}'`)
                    doJob()
                })
            else {
                setting.log(setting.chalk.red(`App '${appname}' does not exist at ${path}`))
                doJob()
            }
        })
        else {
            setting.log(setting.chalk.red(`Name '${appname}' is incorrect, it should not be empty and contain alphabets or number only`))
            doJob()
        }
    }
    function askForNames() {
        var prompt = `Please enter name(s) separated by space(s): `
        rl.setPrompt(prompt)
        rl.prompt()
        rl.on('line', function(line) {
            names = line.split(' ').filter(n => n)
            if (!names.length) setting.log(prompt)
            else rl.close()
        })
        .on('close', doJob)
    }
    if (!names.length) askForNames()
    else doJob()
}
