import clean from 'gulp-clean'

export const cleanFn = function(setting, gulp, cb) {
    setting.log(`Run '${setting.appname}:clean'`)
    setting.src(`${setting.public}/${setting.appname}*`, `${setting.public_static}/${setting.appname}*`)
        .pipe(clean({force: true}))
        .on('data', function () {})
        .on('end', function() {
            // setting.log(`Done '${setting.appname}:clean'`)
            cb()
        })
}
export default function(setting, gulp) {
    gulp.task(`${setting.appname}:clean`, cleanFn.bind(this, setting, gulp))
}
