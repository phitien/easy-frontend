var livereload = require('gulp-livereload')

const watchFn = function(setting, cb) {
    setting.log(`Running  '${setting.ezy ? `${setting.appname}:` : ''}watch'`)
    livereload.listen(setting.livereload)
    setting.gulp.watch([]
        .concat(setting.files(`${setting.ezy_common}`, '*.jsx'))
        .concat(setting.files(`${setting.ezy_components}`, '*.jsx'))
        .concat(setting.files(`${setting.app_dir}`, '*.jsx'))
        , [`${setting.ezy ? `${setting.appname}:` : ''}js`])
    setting.gulp.watch([]
        .concat(setting.files(`${setting.ezy_sass}`, '*.scss'))
        .concat(setting.files(`${setting.app_sass}`, '*.scss'))
        , [`${setting.ezy ? `${setting.appname}:` : ''}css`])
    setting.gulp.watch([]
        .concat(setting.files(`${setting.app_templates}`, '*.html'))
        , [`${setting.ezy ? `${setting.appname}:` : ''}inject`])
    setting.gulp.watch([]
        .concat(setting.files(`${setting.ezy_static}`, '*'))
        .concat(setting.files(`${setting.app_static}`, '*'))
        , [`${setting.ezy ? `${setting.appname}:` : ''}copy`])
    setting.gulp.watch([
        `${setting.public_static()}/${setting.appname}/*${setting.appname}*.css`,
        `${setting.public_static()}/${setting.appname}/*${setting.appname}*.js`,
        `${setting.public_profile()}/*${setting.appname}*.html`,
    ])
    .on('change', livereload.reload)
    cb()
}
module.exports = exports = function(setting) {
    setting.gulp.task(`${setting.ezy ? `${setting.appname}:` : ''}watch`, watchFn.bind(this, setting))
}
module.exports.watchFn = watchFn
