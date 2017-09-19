const connectFn = function(setting, cb) {
    var connect = require('gulp-connect')
    setting.log(`Running  '${setting.appname}:connect'`)
    connect.server({
        name: `Application ${setting.AppName} - ${setting.profile}`,
        root: [setting.public],
        port: setting.port,
        livereload: {port: setting.livereload},
        fallback: `${setting.public}/${setting.appname}.html`
    })
    cb()
}
module.exports = exports = function(setting) {
    setting.gulp.task(`${setting.appname}:connect`, connectFn.bind(this, setting))
}
module.exports.connectFn = connectFn
