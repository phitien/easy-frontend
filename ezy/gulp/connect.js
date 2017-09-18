var gulp = require('gulp')
var connect = require('gulp-connect')

const connectFn = function(setting, cb) {
    setting.log(`Running  '${setting.appname}:connect'`)
    connect.server({
        name: `Application ${setting.AppName} - ${setting.profile}`,
        root: [setting.public],
        port: setting.port,
        livereload: {port: setting.livereload},
        fallback: `${setting.public}/${setting.appname}.html`
    })
    // setting.log(`Done '${setting.appname}:connect'`)
    cb()
}
module.exports = exports = function(setting) {
    gulp.task(`${setting.appname}:connect`, connectFn.bind(this, setting))
}
module.exports.connectFn = connectFn
