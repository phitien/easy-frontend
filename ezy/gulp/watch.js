var livereload = require('gulp-livereload')

const watchFn = function(setting, cb) {
    setting.log(`Running  '${setting.appname}:watch'`)
    livereload.listen(setting.livereload)
    setting.gulp.watch([]
        .concat(setting.files(`${setting.ezy_common}`, '*.jsx'))
        .concat(setting.files(`${setting.ezy_components}`, '*.jsx'))
        .concat(setting.files(`${setting.app_dir}`, '*.jsx'))
        , [`${setting.appname}:js`])
    setting.gulp.watch([]
        .concat(setting.files(`${setting.ezy_sass}`, '*.scss'))
        .concat(setting.files(`${setting.app_sass}`, '*.scss'))
        , [`${setting.appname}:css`])
    setting.gulp.watch([]
        .concat(setting.files(`${setting.app_templates}`, '*.html'))
        , [`${setting.appname}:inject`])
    setting.gulp.watch([]
        .concat(setting.files(`${setting.ezy_static}`, '*'))
        .concat(setting.files(`${setting.app_static}`, '*'))
        , [`${setting.appname}:copy`])
    setting.gulp.watch([
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
module.exports = exports = function(setting) {
    setting.gulp.task(`${setting.appname}:watch`, watchFn.bind(this, setting))
}
module.exports.watchFn = watchFn
