import gulp from 'gulp'
import clean from 'gulp-clean'

export const cleanFn = function(setting, cb) {
    setting.log(`Running  '${setting.appname}:clean'`)
    setting.src(`${setting.public}/${setting.appname}*`, `${setting.public_static}/${setting.appname}*`)
        .pipe(clean({force: true}))
        .on('data', function () {})
        .on('end', function() {
            // setting.log(`Done '${setting.appname}:clean'`)
            cb()
        })
}
export default function(setting) {
    gulp.task(`${setting.appname}:clean`, cleanFn.bind(this, setting))
}
