const settingFn = function(config, cb) {
    config.log(`Running  '${config.ezy ? `${config.appname}:` : ''}setting'`)
    config.srcNormalized(`${config.sample_config}/index.jsx`)
        .pipe(config.gulp.dest(`${config.app_config}`, {overwrite: true}))
        .on('end', cb)
}
module.exports = exports = function(config) {
    config.gulp.task(`${config.ezy ? `${config.appname}:` : ''}config`, settingFn.bind(this, config))
}
module.exports.settingFn = settingFn
