const jsFn = function(config, cb) {
    var source = require('vinyl-source-stream')
    var buffer = require('vinyl-buffer')
    var browserify = require('browserify')
    var babelify = require('babelify')
    var uglify = require('gulp-uglify')
    var sourcemaps = require('gulp-sourcemaps')
    config.log(`Running  '${config.ezy ? `${config.appname}:` : ''}js'`)
    var bundleCnf = {
        debug: config.debug, transform: [babelify], entries: [`${config.app_dir}/index.jsx`], extensions: ['.jsx'],
        paths: ['.', './node_modules', config.app_home, `${config.app_home}/node_modules`, config.ezy_home, `${config.ezy_home}/node_modules`]
    }
    var bundler = browserify(bundleCnf)
    config.libs.forEach(libs => libs.forEach(lib => bundler.external(lib)))
    bundler.bundle()
        .on('update', jsFn)
        .on('error', function(err, ...args) {
            config.log(err, ...args)
            this.emit('end')
        })
        .pipe(source(`${config.appname}.js`))
        .pipe(buffer())
        .pipe(config.debug ? sourcemaps.init() : config.noop())
        .pipe(config.debug ? config.noop() : uglify())
        .pipe(config.debug ? sourcemaps.write('./') : config.noop())
        .pipe(config.gulp.dest(`${config.public_static()}/${config.appname}`, {overwrite: true}))
        .on('end', cb)
}

module.exports = exports = function(config) {
    config.gulp.task(`${config.ezy ? `${config.appname}:` : ''}js`, jsFn.bind(this, config))
}
module.exports.jsFn = jsFn
