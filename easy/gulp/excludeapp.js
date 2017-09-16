export default function(setting, gulp) {
    gulp.task(`excludeapp`, function(cb) {
        if (!setting.easy) return
        if (!setting.appname) {
            console.error('Name is missing, syntax: gulp excludeapp --name=name')
            return
        }
        let replace = require('gulp-replace')
        setting.src(setting.gulpfile)
            .pipe(replace(setting.commands.app.removal(), ''))
            .pipe(gulp.dest('.', {overwrite: true}))
        cb()
    })
}
