module.exports = exports = function(config) {
    var fs = require('fs')
    const {exec} = require('child_process')
    const install = function () {
        config.setting.log(`EZY Installing ..., it takes about 5-10 mins to finished process`)
        exec(`cd ${process.env.HOME}/${config.EZY_HOME} && npm i && npm i -g`, (err, stdout, stderr) => {
            if (err) config.setting.log(`EZY Error: Could not update EZY modules`, err)
            exec(`cat ~/.bash_profile | sed '/EZY_HOME/d' | tee ~/.bash_profile && echo 'export EZY_HOME="$HOME/${config.EZY_HOME}"' >> ~/.bash_profile`, (err, stdout, stderr) => {
                if (err) config.setting.log(`EZY Error: Could not update EZY command`, err)
                exec(`ezy -v`, (err, stdout, stderr) => {
                    if (err) config.setting.log(`EZY Error: Could not update EZY command`, err)
                    config.setting.log(stdout.trim())
                    config.setting.log(`EZY is installed at ${process.env.HOME}/${config.EZY_HOME}`)
                    if (process.env.EZY_HOME != `${process.env.HOME}/${config.EZY_HOME}`) config.setting.log(`Please restart this session or try source ~/.bash_profile`)
                })
            })
        })
    }
    fs.stat(`${process.env.HOME}/${config.EZY_HOME}`, (err, stat) => {
        if (err) {
            config.setting.log(`EZY Cloning ... https://github.com/phitien/easy-frontend.git to ${process.env.HOME}/${config.EZY_HOME}`)
            exec(`cd ${process.env.HOME} && git clone https://github.com/phitien/easy-frontend.git ${config.EZY_HOME}`, (err, stdout, stderr) => {
                if (err) config.setting.log(`EZY Error: Could not clone EZY framework`, err)
                install()
            })
        }
        else {
            config.setting.log(`EZY Updating ... https://github.com/phitien/easy-frontend.git to ${process.env.HOME}/${config.EZY_HOME}`)
            exec(`cd ${process.env.HOME}/${config.EZY_HOME} && git checkout . && git pull`, (err, stdout, stderr) => {
                if (err) config.setting.log(`EZY Error: Could not clone EZY framework`, err)
                install()
            })
        }
    })
}
