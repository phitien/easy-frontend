export default function(setting, gulp) {
    let source = require('vinyl-source-stream')
    let buffer = require('vinyl-buffer')
    let browserify = require('browserify')
    let babelify = require('babelify')
    let uglify = require('gulp-uglify')
    let sourcemaps = require('gulp-sourcemaps')
    let bundleCnf = {
        debug: false, transform: [babelify], entries: [`${setting.app_dir}/index.jsx`], extensions: ['.jsx'],
    }
    let bundler = browserify(bundleCnf)
    setting.libs.forEach(libs => libs.forEach(lib => bundler.external(lib)))
    let doBundle = function(cb) {
        bundler.bundle()
            .on('update', doBundle)
            .on('error', function(err, ...args) {
                setting.log(err, ...args)
                this.emit('end')
            })
            .pipe(source(`${setting.appname}.js`))
            .pipe(buffer())
            .pipe(sourcemaps.init())
            .pipe(uglify())
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(`${setting.public_static}/${setting.appname}`, {overwrite: true}))
    }
    gulp.task(`${setting.appname}:js`, function(cb) {
        doBundle()
        cb()
    })
}
