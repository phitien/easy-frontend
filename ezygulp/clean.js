const cleanFn = function(config, cb) {
    var clean = require('gulp-clean')
    config.log(`Running  '${config.ezy ? `${config.appname}:` : ''}clean'`)
    config.src(`${config.public_profile()}/${config.appname}*`, `${config.public_static()}/${config.appname}*`)
        .pipe(clean({force: true}))
        .on('data', config.ondata)
        .on('end', cb)
}
module.exports = exports = function(config) {
    config.gulp.task(`${config.ezy ? `${config.appname}:` : ''}clean`, cleanFn.bind(this, config))
}
module.exports.cleanFn = cleanFn
