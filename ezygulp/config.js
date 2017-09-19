const configFn = function(setting, cb) {
    setting.log(`Running  '${setting.ezy ? `${setting.appname}:` : ''}config'`)
    setting.srcNormalized(`${setting.sample_config}/index.jsx`)
        .pipe(setting.gulp.dest(`${setting.app_config}`, {overwrite: true}))
        .on('end', cb)
}
module.exports = exports = function(setting) {
    setting.gulp.task(`${setting.ezy ? `${setting.appname}:` : ''}config`, configFn.bind(this, setting))
}
module.exports.configFn = configFn
