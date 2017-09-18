var gulp = require('gulp')
var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var browserify = require('browserify')
var babelify = require('babelify')
var uglify = require('gulp-uglify')
var sourcemaps = require('gulp-sourcemaps')

const vendorFn = function(setting, cb, i) {
    i = i || 0
    if (i == 0) setting.log(`Running  '${setting.appname}:vendor'`)
    var bundleCnf = {
        debug: false, transform: [babelify],
    }
    var bundler = browserify(bundleCnf)
    setting.libs[i || 0].forEach(lib => bundler.require(lib))
    bundler.bundle()
        .on('error', function(err, ...args) {
            setting.log(err, ...args)
            this.emit('end')
        })
        .on('end', function() {
            i++
            if (i == setting.libs.length) {
                // setting.log(`Done '${setting.appname}:vendor'`)
                cb()
                return
            }
            vendorFn.bind(this, setting, cb, i)()
        })
        .pipe(source(`${setting.appname}-${i}.js`))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(`${setting.public_static}/${setting.appname}`, {overwrite: true}))
}
module.exports = exports = function(setting) {
    gulp.task(`${setting.appname}:vendor`, function(cb) {
        vendorFn.bind(this, setting, cb, 0)()
    })
}
module.exports.vendorFn = vendorFn
