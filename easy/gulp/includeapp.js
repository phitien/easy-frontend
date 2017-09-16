export default function(setting, gulp) {
    gulp.task(`includeapp`, function(cb) {
        if (!setting.easy) return
        if (!setting.appname) {
            console.error('Name is missing, syntax: gulp includeapp --name=name --dir=/path/to/app')
            return
        }
        let fs = require('fs')
        fs.stat(`${setting.app_dir}`, function(err, stat) {
            if (err) {
                setting.log(`App ${setting.appname} does not exist`, err)
                return
            }
            let replace = require('gulp-replace')
            setting.src(setting.gulpfile)
                .pipe(replace(setting.commands.app.removal(), ''))
                .pipe(replace(setting.commands.app.key, setting.commands.app.addon()))
                .pipe(gulp.dest('.', {overwrite: true}))
        })
        cb()
    })
}
