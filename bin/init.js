module.exports = exports = function(config) {
    var fs = require('fs')
    var gulp = require('gulp')
    var name, appname, path
    var readline = require('readline')
    var rl = readline.createInterface(process.stdin, process.stdout)
    function instruction() {config.setting.log(`Please enter another name or 1 to exit: `)}
    rl.setPrompt('Please enter a name: ')
    rl.prompt()
    rl.on('line', function(line) {
        name = line
        appname = line.replace(/\W/g, '')
        if (appname == 1) rl.close()
        else if (appname) {
            path = config.setting.ezy ? `${config.setting.ezy_apps}/${appname}` : `${config.setting.pwd}/${appname}`
            fs.stat(`${path}`, function(err, stat) {
                if (!err) {
                    config.setting.log(`Name '${appname}' already exists at ${path}`)
                    instruction()
                }
                else rl.close()
            })
        }
        else {
            config.setting.log(`Name is incorrect, it should not be empty and contain alphabets or number only`)
            instruction()
        }
    })
    .on('close', function() {
        if (!appname) return process.exit(0)
        if (appname == '1') return process.exit(0)
        const {exec} = require('child_process')
        exec(`cd ${config.setting.ezy_home} && gulp mkapp -n="${name}" ${config.setting.ezy ? '' : `-path="${path}"`}`, (err, stdout, stderr) => {
            if (err) config.setting.log(err.trim())
            if (stderr) config.setting.log(stderr.trim())
            config.setting.log(`App '${name}' is created at '${path}'`)
            process.exit(0)
        })
    })
}
