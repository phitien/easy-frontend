var livereload = require('gulp-livereload')

const watchFn = function(config, cb) {
    config.log(`Running  '${config.ezy ? `${config.appname}:` : ''}watch'`)
    livereload.listen(config.livereload)
    config.gulp.watch([]
        .concat(config.files(`${config.ezy_common}`, '*.jsx'))
        .concat(config.files(`${config.ezy_components}`, '*.jsx'))
        .concat(config.files(`${config.app_dir}`, '*.jsx'))
        , [`${config.ezy ? `${config.appname}:` : ''}js`])
    config.gulp.watch([]
        .concat(config.files(`${config.ezy_sass}`, '*.scss'))
        .concat(config.files(`${config.app_sass}`, '*.scss'))
        , [`${config.ezy ? `${config.appname}:` : ''}css`])
    config.gulp.watch([]
        .concat(config.files(`${config.app_templates}`, '*.html'))
        , [`${config.ezy ? `${config.appname}:` : ''}inject`])
    config.gulp.watch([]
        .concat(config.files(`${config.ezy_static}`, '*'))
        .concat(config.files(`${config.app_static}`, '*'))
        , [`${config.ezy ? `${config.appname}:` : ''}copy`])
    config.gulp.watch([
        `${config.public_static()}/${config.appname}/*${config.appname}*.css`,
        `${config.public_static()}/${config.appname}/*${config.appname}*.js`,
        `${config.public_profile()}/*${config.appname}*.html`,
    ])
    .on('change', livereload.reload)
    cb()
}
module.exports = exports = function(config) {
    config.gulp.task(`${config.ezy ? `${config.appname}:` : ''}watch`, watchFn.bind(this, config))
}
module.exports.watchFn = watchFn
