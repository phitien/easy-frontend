module.exports = exports = function(setting) {
    var fs = require('fs')
    var exec = require('child_process').exec
    var names = setting.argv.tasks()
    names.shift()
    var readline = require('readline')
    var rl = readline.createInterface(process.stdin, process.stdout)
    function checkAndDoJob() {
        var dir = setting.ezy ? setting.ezy_apps : setting.argv('dir|d', setting.pwd)
        names.forEach((name,i) => {
            var cb = i < names.length - 1 ? (e => {}) : (e => process.exit(0))
            var appname = name.replace(/\W/g, '')
            var path = `${dir}/${appname}`
            if (appname) fs.stat(`${path}`, function(err, stat) {
                if (!err) {
                    setting.log(setting.chalk.red(`App '${appname}' already exists at ${path}`))
                    cb()
                }
                else doJob(name, appname, dir, cb)
            })
            else {
                setting.log(setting.chalk.red(`Name '${appname}' is incorrect, it should not be empty and contain alphabets or number only`))
                cb()
            }
        })
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
        .on('close', checkAndDoJob)
    }
    function doJob(name, appname, dir, cb) {
        setting.log(`Creating app: ${name} ...`)
        exec(`cd ${setting.ezy_home} && gulp mkapp -name="${name}" -dir="${dir}"`, (err, stdout, stderr) => {
            if (err) {
                setting.log(`EZY Error: Could not create app '${name}' at ${dir}`, err)
                cb()
            }
            else if (stderr) {
                setting.log(setting.chalk.red(stderr.trim()))
                cb()
            }
            else exec(`cd "${dir}/${appname}" && npm install`, (err, stdout, stderr) => {
                if (err) setting.log(err)
                else if (stderr) setting.log(setting.chalk.red(stderr.trim()))
                setting.log(`App '${name}' is created at '${dir}/${appname}'`)
                cb()
            })
        })
    }
    if (!names.length) askForNames()
    else checkAndDoJob()
}
