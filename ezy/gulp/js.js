const jsFn = function(setting, cb) {
    var source = require('vinyl-source-stream')
    var buffer = require('vinyl-buffer')
    var browserify = require('browserify')
    var babelify = require('babelify')
    var uglify = require('gulp-uglify')
    var sourcemaps = require('gulp-sourcemaps')
    setting.log(`Running  '${setting.appname}:js'`)
    var bundleCnf = {
        debug: setting.debug, transform: [babelify], entries: [`${setting.app_dir}/index.jsx`], extensions: ['.jsx'],
        paths: ['.', './node_modules', setting.ezy_home, `${setting.ezy_home}/node_modules`, setting.app_home, `${setting.app_home}/node_modules`]
    }
    var bundler = browserify(bundleCnf)
    setting.libs.forEach(libs => libs.forEach(lib => bundler.external(lib)))
    bundler.bundle()
        .pipe(source(`${setting.appname}.js`))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(setting.gulp.dest(`${setting.public_static}/${setting.appname}`, {overwrite: true}))
        .on('update', jsFn)
        .on('error', function(err, ...args) {
            setting.log(err, ...args)
            this.emit('end')
        })
        .on('end', cb)
}

module.exports = exports = function(setting) {
    setting.gulp.task(`${setting.appname}:js`, jsFn.bind(this, setting))
}
module.exports.jsFn = jsFn
