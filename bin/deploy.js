module.exports = exports = function(setting) {
    var fs = require('fs')
    var exec = require('child_process').exec
    var name, appname, path
    var profiles = setting.argv.tasks()
    profiles.shift()
    var app = setting.argv('app|a')
    if (!profiles.length) profiles.push('dev')
    if (!app && setting.ezy) setting.log(`EZY Error: no app provided`)
    else {
        function doJob() {
            if (!profiles.length) process.exit(0)
            var profile = setting.profile = profiles.shift()
            setting.log(`Deploying profile: ${profile} ...`)
            var profileCmd = app ? `gulp ${app}:mkprofile -name=${profile}` : `gulp mkprofile -name=${profile}`
            var params = `-profile=${profile} -dir=${setting.argv('dir|d', '')} ${setting.debug ? '-debug': ''} ${setting.production ? '-production': ''} -port=${setting.port}`
            var buildCmd = app ? `gulp ${app} ${params}` : `gulp ${params}`
            var injectCmd = app ? `gulp ${app}:inject -profile=${profile}` : `gulp inject -profile=${profile}`
            setting.delay = 0
            exec(`${profileCmd}`, (err, stdout, stderr) => {
                if (err) setting.log(err)
                else if (stderr) setting.log(setting.chalk.red(stderr.trim()))
                exec(`${buildCmd}`, (err, stdout, stderr) => {
                    if (err) setting.log(err)
                    else if (stderr) setting.log(setting.chalk.red(stderr.trim()))
                    exec(`${injectCmd}`, (err, stdout, stderr) => {
                        if (err) setting.log(err)
                        else if (stderr) setting.log(setting.chalk.red(stderr.trim()))
                        setting.log(`EZY deployed ${profile} profile to ${setting.public_profile()}`)
                        doJob()
                    })
                })
            })
        }
        exec(app ? `gulp ${app}:info` : `gulp info`, (err, stdout, stderr) => {
            if (err) setting.log(`EZY Error: Could not run`, err)
            else if (stderr) setting.log(setting.chalk.red(stderr.trim()))
            else doJob()
        })
    }
}
