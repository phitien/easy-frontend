export default function(setting, gulp) {
    gulp.task(`${setting.appname}:watch`, function(cb) {
        let livereload = require('gulp-livereload')
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
            `${setting.public}/*${setting.appname}*.*`,
            `${setting.public_static}/${setting.appname}/*.*`,
        ])
        .on('change', livereload.reload)
        cb()
    })
}
