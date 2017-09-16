export default function(setting, gulp) {
    gulp.task(`rmapp`, function(cb) {
        if (!setting.easy) return
        if (!setting.appname) {
            console.error('Name is missing, syntax: gulp rmapp --name=name')
            return
        }
        let fs = require('fs')
        let replace = require('gulp-replace')
        setting.src(setting.gulpfile)
            .pipe(replace(setting.commands.app.removal(), ''))
            .pipe(gulp.dest('.', {overwrite: true}))
        fs.stat(`${setting.app_dir}`, function(err, stat) {
            if (err) return
            let clean = require('gulp-clean')
            setting.src([
                setting.app_dir,
                `${setting.public}/${setting.appname}*`,
                `${setting.public_static}/${setting.appname}*`
            ], {read: false})
                .pipe(clean({force: true}))
        })
        cb()
    })
}
