module.exports = exports = function(config) {
    var fs = require('fs')
    var name, appname, path
    var tasks = config.setting.argv.tasks()
    if (tasks.length) {
        var otasks = tasks.filter(t => !/^(init|make|mkapp|mk)$/.test(t))
        name = otasks.length ? otasks[0] : name
    }
    var readline = require('readline')
    var rl = readline.createInterface(process.stdin, process.stdout)

    function instruction() {config.setting.log(`Please enter another name or 1 to exit: `)}
    function checkName(ok, ko) {
        appname = name.replace(/\W/g, '')
        if (appname == 1) rl.close()
        else if (appname) {
            path = config.setting.ezy ? `${config.setting.ezy_apps}/${appname}` : `${config.setting.pwd}/${appname}`
            fs.stat(`${path}`, function(err, stat) {
                if (!err) {
                    config.setting.log(`Name '${appname}' already exists at ${path}`)
                    ko()
                }
                else ok()
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
        .on('close', doCreate)
    }
    function doCreate() {
        if (!appname) return
        if (appname == '1') return
        const {exec} = require('child_process')
        exec(`cd ${config.setting.ezy_home} && gulp mkapp -n="${name}" ${config.setting.ezy ? '' : `-path="${path}"`}`, (err, stdout, stderr) => {
            if (err) config.setting.log(err.trim())
            if (stderr) config.setting.log(stderr.trim())
            config.setting.log(`App '${name}' is created at '${path}'`)
            process.exit()
        })
    }
    if (!name) askForName()
    else checkName(doCreate, askForName)
}
