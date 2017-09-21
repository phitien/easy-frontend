const vendorFn = function(setting, cb, i) {
    var source = require('vinyl-source-stream')
    var buffer = require('vinyl-buffer')
    var browserify = require('browserify')
    var babelify = require('babelify')
    var uglify = require('gulp-uglify')
    var sourcemaps = require('gulp-sourcemaps')
    i = i || 0
    if (i == 0) setting.log(`Running  '${setting.ezy ? `${setting.appname}:` : ''}vendor'`)
    var bundleCnf = {
        debug: setting.debug, transform: [babelify],
    }
    var bundler = browserify(bundleCnf)
    setting.libs[i || 0].forEach(lib => bundler.require(lib))
    bundler.bundle()
        .pipe(source(`${setting.appname}-${i}.js`))
        .pipe(buffer())
        .pipe(setting.debug ? sourcemaps.init() : setting.noop())
        .pipe(setting.debug ? setting.noop() : uglify())
        .pipe(setting.debug ? sourcemaps.write('./') : setting.noop())
        .pipe(setting.gulp.dest(`${setting.public_static()}/${setting.appname}`, {overwrite: true}))
        .on('error', function(err, ...args) {
            setting.log(err, ...args)
            this.emit('end')
        })
        .on('end', function() {
            i++
            if (i == setting.libs.length) {
                cb()
                return
            }
            vendorFn.bind(this, setting, cb, i)()
        })
}
module.exports = exports = function(setting) {
    setting.gulp.task(`${setting.ezy ? `${setting.appname}:` : ''}vendor`, function(cb) {
        vendorFn.bind(this, setting, cb, 0)()
    })
}
module.exports.vendorFn = vendorFn
