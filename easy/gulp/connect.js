import connect from 'gulp-connect'

export const connectFn = function(setting, gulp, cb) {
    setting.log(`Run '${setting.appname}:connect'`)
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
export default function(setting, gulp) {
    gulp.task(`${setting.appname}:connect`, connectFn.bind(this, setting, gulp))
}
