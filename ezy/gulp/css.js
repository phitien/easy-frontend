const cssFn = function(setting, cb) {
    var sass = require('gulp-sass')
    var sourcemaps = require('gulp-sourcemaps')
    var autoprefixer = require('gulp-autoprefixer')
    var concat = require('gulp-concat')
    var run = require('run-sequence')
    setting.log(`Running  '${setting.appname}:css'`)
    setting.src(`${setting.app_sass}/index.scss`)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths: ['.', './node_modules', setting.ezy_dir, setting.app_dir]
        }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(concat(`${setting.appname}.css`))
        .pipe(sourcemaps.write('./'))
        .pipe(setting.gulp.dest(`${setting.public_static}/${setting.appname}`, {overwrite: true}))
        .on('end', cb)
}
module.exports = exports = function(setting) {
    setting.gulp.task(`${setting.appname}:css`, cssFn.bind(this, setting))
}
module.exports.cssFn = cssFn
