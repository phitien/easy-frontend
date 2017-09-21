var exec = require('child_process').exec

const build = function (setting, EZY_HOME) {
    setting.log(`EZY Installing ..., it takes about 5-10 mins to finished process`)
    exec(`cd ${EZY_HOME} && npm i gulp@^3.9.1 -D && npm i gulp@^3.9.1 -g && npm i && npm i -g`, (err, stdout, stderr) => {
        if (err) setting.log(`EZY Error: Could not update EZY modules`, err)
        else if (stderr) setting.log(setting.chalk.red(stderr.trim()))
        else exec(`cd ${EZY_HOME} && cat ~/.bash_profile | sed '/EZY_HOME/d' 2>&1 | tee ~/.bash_profile && echo export \"EZY_HOME=\"$(pwd)\"\" >> ~/.bash_profile`, (err, stdout, stderr) => {
            if (err) setting.log(`EZY Error: Could not update EZY command`, err)
            else if (stderr) setting.log(setting.chalk.red(stderr.trim()))
            else exec(`ezy -v`, (err, stdout, stderr) => {
                if (err) setting.log(`EZY Error: Could not update EZY command`, err)
                else if (stderr) setting.log(setting.chalk.red(stderr.trim()))
                else {
                    setting.log(`EZY version ${stdout.trim()} is installed at ${EZY_HOME}`)
                    if (EZY_HOME != `${process.env.HOME}/${setting.EZY_HOME}`) setting.log(`Please open new session or try source ~/.bash_profile`)
                }
            })
        })
    })
}
module.exports = exports = function(setting) {
    var fs = require('fs')
    var exec = require('child_process').exec
    var EZY_HOME = setting.ezy_home
    fs.stat(`${EZY_HOME}`, (err, stat) => {
        if (err) {
            EZY_HOME = `${process.env.HOME}/${setting.EZY_HOME}`
            setting.log(`EZY Cloning ... https://github.com/phitien/easy-frontend.git to ${EZY_HOME}`)
            exec(`cd ${process.env.HOME} && git clone https://github.com/phitien/easy-frontend.git ${setting.EZY_HOME}`, (err, stdout, stderr) => {
                if (err) setting.log(`EZY Error: Could not clone EZY framework`, err)
                else if (stderr) setting.log(setting.chalk.red(stderr.trim()))
                else build(setting, EZY_HOME)
            })
        }
        else {
            setting.log(`EZY Updating ... https://github.com/phitien/easy-frontend.git to ${EZY_HOME}`)
            exec(`cd ${EZY_HOME} && git checkout . && git pull`, (err, stdout, stderr) => {
                if (err) setting.log(`EZY Error: Could not update EZY framework`, err)
                else if (stderr) setting.log(setting.chalk.red(stderr.trim()))
                else build(setting, EZY_HOME)
            })
        }
    })
}
module.exports.build = build
