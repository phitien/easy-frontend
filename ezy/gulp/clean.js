const cleanFn = function(setting, cb) {
    var clean = require('gulp-clean')
    setting.log(`Running  '${setting.appname}:clean'`)
    setting.src(`${setting.public}/${setting.appname}*`, `${setting.public_static}/${setting.appname}*`)
        .pipe(clean({force: true}))
        .on('end', cb)
}
module.exports = exports = function(setting) {
    setting.gulp.task(`${setting.appname}:clean`, cleanFn.bind(this, setting))
}
module.exports.cleanFn = cleanFn
