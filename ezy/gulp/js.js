import gulp from 'gulp'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import browserify from 'browserify'
import babelify from 'babelify'
import uglify from 'gulp-uglify'
import sourcemaps from 'gulp-sourcemaps'

export const jsFn = function(setting, cb) {
    setting.log(`Running  '${setting.appname}:js'`)
    let bundleCnf = {
        debug: setting.debug, transform: [babelify], entries: [`${setting.app_dir}/index.jsx`], extensions: ['.jsx'],
    }
    let bundler = browserify(bundleCnf)
    setting.libs.forEach(libs => libs.forEach(lib => bundler.external(lib)))
    bundler.bundle()
        .on('update', jsFn)
        .on('error', function(err, ...args) {
            setting.log(err, ...args)
            this.emit('end')
        })
        .on('end', function() {
            // setting.log(`Done '${setting.appname}:js'`)
            cb()
        })
        .pipe(source(`${setting.appname}.js`))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(`${setting.public_static}/${setting.appname}`, {overwrite: true}))
}

export default function(setting) {
    gulp.task(`${setting.appname}:js`, jsFn.bind(this, setting))
}
