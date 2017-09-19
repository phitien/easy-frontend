module.exports = exports = function(config) {
    var fs = require('fs')
    var gulp = require('gulp')
    var readline = require('readline')
    var polish = require('../ezy/gulp/polish')
    var setting = {}, name, appname, path
    polish(setting, gulp)
    var rl = readline.createInterface(process.stdin, process.stdout)
    function instruction() {
        setting.log(`Please enter another name or 1 to exit: `)
    }
    rl.setPrompt('Please enter a name: ')
    rl.prompt()
    rl.on('line', function(line) {
        name = line
        appname = line.replace(/\W/g, '')
        if (appname == 1) rl.close()
        else if (appname) {
            path = setting.ezy ? `${setting.ezy_apps}/${appname}` : `${setting.pwd}/${appname}`
            fs.stat(`${path}`, function(err, stat) {
                if (!err) {
                    setting.log(`Name '${appname}' already exists at ${path}`)
                    instruction()
                }
                else rl.close()
            })
        }
        else {
            setting.log(`Name is incorrect, it should not be empty and contain alphabets or number only`)
            instruction()
        }
    })
    .on('close', function() {
        if (!appname) return process.exit(0)
        if (appname == '1') return process.exit(0)
        const {exec} = require('child_process')
        exec(`cd ${setting.ezy_home} && gulp mkapp -n="${name}" ${setting.ezy ? '' : `-path="${path}"`}`, (err, stdout, stderr) => {
            if (err) setting.log(err.trim())
            if (stderr) setting.log(stderr.trim())
            setting.log(`App '${name}' is created at '${path}'`)
            process.exit(0)
        })
    })
}
