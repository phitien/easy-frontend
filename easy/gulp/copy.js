export const copyFn = function(setting, gulp, cb) {
    setting.log(`Run '${setting.appname}:copy'`)
    setting.src(setting.files(setting.easy_static))
        .pipe(gulp.dest(`${setting.public_static}`, {overwrite: true}))
        .on('end', function() {
            setting.src(setting.files(setting.app_static))
                .pipe(gulp.dest(`${setting.public_static}/${setting.appname}`, {overwrite: true}))
                .on('end', function() {
                    // setting.log(`Done '${setting.appname}:copy'`)
                    cb()
                })
        })
}
export default function(setting, gulp) {
    gulp.task(`${setting.appname}:copy`, copyFn.bind(this, setting, gulp))
}
