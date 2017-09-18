var gulp = require('gulp')
var clean = require('gulp-clean')

const cleanFn = function(setting, cb) {
    setting.log(`Running  '${setting.appname}:clean'`)
    setting.src(`${setting.public}/${setting.appname}*`, `${setting.public_static}/${setting.appname}*`)
        .pipe(clean({force: true}))
        .on('data', function () {})
        .on('end', function() {
            // setting.log(`Done '${setting.appname}:clean'`)
            cb()
        })
}
module.exports = exports = function(setting) {
    gulp.task(`${setting.appname}:clean`, cleanFn.bind(this, setting))
}
module.exports.cleanFn = cleanFn
