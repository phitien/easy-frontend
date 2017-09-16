export default function(setting, gulp) {
    gulp.task(`${setting.appname}:copy`, function(cb) {
        setting.src(setting.files(setting.easy_static))
            .pipe(gulp.dest(`${setting.public_static}`, {overwrite: true}))
        setting.src(setting.files(setting.app_static))
            .pipe(gulp.dest(`${setting.public_static}/${setting.appname}`, {overwrite: true}))
        cb()
    })
}
