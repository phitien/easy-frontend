export default function(setting, gulp) {
    gulp.task(`${setting.appname}:config`, function(cb) {
        setting.srcNormalized(`${setting.easy_sample}/config/index.jsx`)
            .pipe(gulp.dest(`${setting.app_dir}/config`, {overwrite: true}))
        cb()
    })
}
