export default function(setting, gulp) {
    let source = require('vinyl-source-stream')
    let buffer = require('vinyl-buffer')
    let browserify = require('browserify')
    let babelify = require('babelify')
    let uglify = require('gulp-uglify')
    let sourcemaps = require('gulp-sourcemaps')
    let bundleCnf = {
        debug: false, transform: [babelify],
    }
    gulp.task(`${setting.appname}:vendor`, function(cb) {
        setting.libs.forEach((libs, i) => {
            let bundler = browserify(bundleCnf)
            libs.forEach(lib => bundler.require(lib))
            bundler.bundle()
                .on('error', function(err, ...args) {
                    setting.log(err, ...args)
                    this.emit('end')
                })
                .pipe(source(`${setting.appname}-${i}.js`))
                .pipe(buffer())
                .pipe(sourcemaps.init())
                .pipe(uglify())
                .pipe(sourcemaps.write('./'))
                .pipe(gulp.dest(`${setting.public_static}/${setting.appname}`, {overwrite: true}))
        })
        cb()
    })
}
