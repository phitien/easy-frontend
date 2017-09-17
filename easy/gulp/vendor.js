import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import browserify from 'browserify'
import babelify from 'babelify'
import uglify from 'gulp-uglify'
import sourcemaps from 'gulp-sourcemaps'

export const vendorFn = function(setting, gulp, cb, i) {
    i = i || 0
    if (i == 0) setting.log(`Run '${setting.appname}:vendor'`)
    let bundleCnf = {
        debug: false, transform: [babelify],
    }
    let bundler = browserify(bundleCnf)
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
            vendorFn.bind(this, setting, gulp, cb, i)()
        })
        .pipe(source(`${setting.appname}-${i}.js`))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(`${setting.public_static}/${setting.appname}`, {overwrite: true}))
}
export default function(setting, gulp) {
    gulp.task(`${setting.appname}:vendor`, function(cb) {
        vendorFn.bind(this, setting, gulp, cb, 0)()
    })
}
