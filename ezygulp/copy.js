const copyFn = function(setting, cb) {
    setting.log(`Running  '${setting.ezy ? `${setting.appname}:` : ''}copy'`)
    setting.src(setting.files(setting.ezy_static))
        .pipe(setting.gulp.dest(`${setting.public_static}`, {overwrite: true}))
        .on('end', function() {
            setting.src(setting.files(setting.app_static))
                .pipe(setting.gulp.dest(`${setting.public_static}/${setting.appname}`, {overwrite: true}))
                .on('end', cb)
        })
}
module.exports = exports = function(setting) {
    setting.gulp.task(`${setting.ezy ? `${setting.appname}:` : ''}copy`, copyFn.bind(this, setting))
}
module.exports.copyFn = copyFn
