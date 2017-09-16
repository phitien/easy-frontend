export default function(setting, gulp) {
    gulp.task(`${setting.appname}:clean`, function(cb) {
        let clean = require('gulp-clean')
        setting.src(`${setting.public}/${setting.appname}*`, `${setting.public_static}/${setting.appname}*`)
            .pipe(clean({force: true}))
        cb()
    })
}
