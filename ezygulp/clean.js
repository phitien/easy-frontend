const cleanFn = function(setting, cb) {
    var clean = require('gulp-clean')
    setting.log(`Running  '${setting.ezy ? `${setting.appname}:` : ''}clean'`)
    setting.src(`${setting.public}/${setting.appname}*`, `${setting.public_static}/${setting.appname}*`)
        .pipe(clean({force: true}))
        .on('data', setting.ondata)
        .on('end', cb)
}
module.exports = exports = function(setting) {
    setting.gulp.task(`${setting.ezy ? `${setting.appname}:` : ''}clean`, cleanFn.bind(this, setting))
}
module.exports.cleanFn = cleanFn
