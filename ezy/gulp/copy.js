import gulp from 'gulp'

export const copyFn = function(setting, cb) {
    setting.log(`Running  '${setting.appname}:copy'`)
    setting.src(setting.files(setting.ezy_static))
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
export default function(setting) {
    gulp.task(`${setting.appname}:copy`, copyFn.bind(this, setting))
}
