module.exports = exports = function(config) {
    var fs = require('fs')
    var exec = require('child_process').exec
    var name, appname, path
    var profiles = config.argv.tasks()
    profiles.shift()
    var app = config.argv('app|a')
    if (!profiles.length) profiles.push('dev')
    if (!app && config.ezy) config.log(`EZY Error: no app provided`)
    else {
        function doJob() {
            if (!profiles.length) process.exit(0)
            var profile = config.profile = profiles.shift()
            config.log(`Deploying profile: ${profile} ...`)
            var profileCmd = app ? `gulp ${app}:mkprofile -name=${profile}` : `gulp mkprofile -name=${profile}`
            var params = `-profile=${profile} -dir=${config.argv('dir|d', '')} ${config.debug ? '-debug': ''} ${config.production ? '-production': ''} -port=${config.port}`
            var buildCmd = app ? `gulp ${app} ${params}` : `gulp ${params}`
            var injectCmd = app ? `gulp ${app}:inject -profile=${profile}` : `gulp inject -profile=${profile}`
            config.delay = 0
            exec(`${profileCmd}`, (err, stdout, stderr) => {
                if (err) config.log(err)
                else if (stderr) config.log(config.chalk.red(stderr.trim()))
                exec(`${buildCmd}`, (err, stdout, stderr) => {
                    if (err) config.log(err)
                    else if (stderr) config.log(config.chalk.red(stderr.trim()))
                    exec(`${injectCmd}`, (err, stdout, stderr) => {
                        if (err) config.log(err)
                        else if (stderr) config.log(config.chalk.red(stderr.trim()))
                        config.log(`EZY deployed ${profile} profile to ${config.public_profile()}`)
                        doJob()
                    })
                })
            })
        }
        exec(app ? `gulp ${app}:info` : `gulp info`, (err, stdout, stderr) => {
            if (err) config.log(`EZY Error: Could not run`, err)
            else if (stderr) config.log(config.chalk.red(stderr.trim()))
            else doJob()
        })
    }
}
