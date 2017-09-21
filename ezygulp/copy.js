const copyFn = function(config, cb) {
    config.log(`Running  '${config.ezy ? `${config.appname}:` : ''}copy'`)
    config.src(config.files(`${config.ezy_home}/node_modules/material-design-icons/iconfont`))
    .pipe(config.gulp.dest(`${config.public_static()}/material`, {overwrite: true}))
    .on('end', function() {
        config.src(config.files(config.ezy_static))
        .pipe(config.gulp.dest(`${config.public_static()}`, {overwrite: true}))
        .on('end', function() {
            config.src(config.files(config.app_static))
            .pipe(config.gulp.dest(`${config.public_static()}/${config.appname}`, {overwrite: true}))
            .on('end', cb)
        })
    })
}
module.exports = exports = function(config) {
    config.gulp.task(`${config.ezy ? `${config.appname}:` : ''}copy`, copyFn.bind(this, config))
}
module.exports.copyFn = copyFn
