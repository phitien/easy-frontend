const vendorFn = function(config, cb, i) {
    var source = require('vinyl-source-stream')
    var buffer = require('vinyl-buffer')
    var browserify = require('browserify')
    var babelify = require('babelify')
    var uglify = require('gulp-uglify')
    var sourcemaps = require('gulp-sourcemaps')
    i = i || 0
    if (i == 0) config.log(`Running  '${config.ezy ? `${config.appname}:` : ''}vendor'`)
    var bundleCnf = {
        debug: config.debug, transform: [babelify],
    }
    var bundler = browserify(bundleCnf)
    config.libs[i || 0].forEach(lib => bundler.require(lib))
    bundler.bundle()
        .pipe(source(`${config.appname}-${i}.js`))
        .pipe(buffer())
        .pipe(config.debug ? sourcemaps.init() : config.noop())
        .pipe(config.debug ? config.noop() : uglify())
        .pipe(config.debug ? sourcemaps.write('./') : config.noop())
        .pipe(config.gulp.dest(`${config.public_static()}/${config.appname}`, {overwrite: true}))
        .on('error', function(err, ...args) {
            config.log(err, ...args)
            this.emit('end')
        })
        .on('end', function() {
            i++
            if (i == config.libs.length) {
                cb()
                return
            }
            vendorFn.bind(this, config, cb, i)()
        })
}
module.exports = exports = function(config) {
    config.gulp.task(`${config.ezy ? `${config.appname}:` : ''}vendor`, function(cb) {
        vendorFn.bind(this, config, cb, 0)()
    })
}
module.exports.vendorFn = vendorFn
