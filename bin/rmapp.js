module.exports = exports = function(config) {
    var fs = require('fs')
    var name, appname, path
    var tasks = config.setting.argv.tasks()
    if (tasks.length) {
        var otasks = tasks.filter(t => !/^(remove|rmapp|rm)$/.test(t))
        name = otasks.length ? otasks[0] : name
    }
    var readline = require('readline')
    var rl = readline.createInterface(process.stdin, process.stdout)

    function instruction() {config.setting.log(`Please enter another name or 1 to exit: `)}
    function checkName(ok, ko) {
        appname = name.replace(/\W/g, '')
        if (appname == 1) rl.close()
        else if (appname) {
            path = `${config.setting.ezy_apps}/${appname}`
            fs.stat(`${path}`, function(err, stat) {
                if (!err) ok()
                else {
                    config.setting.log(`Name '${appname}' is not existing at ${path}`)
                    ko()
                }
            })
        }
        else {
            config.setting.log(`Name is incorrect, it should not be empty and contain alphabets or number only`)
            ko()
        }
    }
    function askForName() {
        rl.setPrompt('Please enter a name: ')
        rl.prompt()
        rl.on('line', function(line) {
            name = line
            checkName(rl.close.bind(rl), instruction)
        })
        .on('close', doRemove)
    }
    function doRemove() {
        if (!appname) return
        if (appname == '1') return
        const {exec} = require('child_process')
        exec(`cd ${config.setting.ezy_home} && gulp rmapp -n="${name}"`, (err, stdout, stderr) => {
            if (err) config.setting.log(err)
            if (stderr) config.setting.log(stderr)
            config.setting.log(`App '${name}' at '${path}' is removed`)
            process.exit()
        })
    }
    if (!name) askForName()
    else checkName(doRemove, askForName)
}
