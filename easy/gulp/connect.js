export default function(setting, gulp) {
    gulp.task(`${setting.appname}:connect`, function(cb) {
        let connect = require('gulp-connect')
        connect.server({
            name: `Application ${setting.Appname} - ${setting.profile}`,
            root: [setting.public],
            port: setting.port,
            livereload: {port: setting.livereload},
            fallback: `${setting.public}/${setting.appname}.html`
        })
        cb()
    })
}
