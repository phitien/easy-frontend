import livereload from 'gulp-livereload'

export const watchFn = function(setting, gulp, cb) {
    setting.log(`Run '${setting.appname}:watch'`)
    livereload.listen(setting.livereload)
    gulp.watch([]
        .concat(setting.files(`${setting.easy_common}`, '*.jsx'))
        .concat(setting.files(`${setting.easy_components}`, '*.jsx'))
        .concat(setting.files(`${setting.app_dir}`, '*.jsx'))
        , [`${setting.appname}:js`])
    gulp.watch([]
        .concat(setting.files(`${setting.easy_sass}`, '*.scss'))
        .concat(setting.files(`${setting.app_sass}`, '*.scss'))
        , [`${setting.appname}:css`])
    gulp.watch([]
        .concat(setting.files(`${setting.app_templates}`, '*.html'))
        , [`${setting.appname}:inject`])
    gulp.watch([]
        .concat(setting.files(`${setting.easy_static}`, '*'))
        .concat(setting.files(`${setting.app_static}`, '*'))
        , [`${setting.appname}:copy`])
    gulp.watch([
        `${setting.public_static}/${setting.appname}/*${setting.appname}*.css`,
        `${setting.public_static}/${setting.appname}/*${setting.appname}*.js`,
        `${setting.public}/*${setting.appname}*.html`,
    ])
    .on('change', livereload.reload)
    .on('end', function() {
        // setting.log(`Done '${setting.appname}:watch'`)
        cb()
    })
}
export default function(setting, gulp) {
    gulp.task(`${setting.appname}:watch`, watchFn.bind(this, setting, gulp))
}
