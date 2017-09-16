import replace from 'gulp-replace'
export default function(setting, gulp) {
    gulp.task(`mkapp`, function(cb) {
        if (!setting.easy) return
        if (!setting.appname) {
            console.error('Name is missing, syntax: gulp mkapp --name=name --dir=/path/to/app')
            return
        }
        let fs = require('fs')
        fs.stat(`${setting.dir}`, function(err, stat) {
            if (!err) {
                console.log(`App ${setting.appname} already exists`)
                return
            }
            setting.srcNormalized(setting.files(setting.easy_sample))
                .pipe(gulp.dest(setting.dir))
            if (setting.dir == setting.app_dir) setting.src(setting.gulpfile)
                .pipe(replace(setting.commands.app.removal(), ''))
                .pipe(replace(setting.commands.app.key, setting.commands.app.addon()))
                .pipe(gulp.dest('.', {overwrite: true}))
        })
        cb()
    })
}
