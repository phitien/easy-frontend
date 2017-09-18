var gulp = require('gulp')
var sass = require('gulp-sass')
var sourcemaps = require('gulp-sourcemaps')
var autoprefixer = require('gulp-autoprefixer')
var concat = require('gulp-concat')
var run = require('run-sequence')

const cssFn = function(setting, cb) {
    setting.log(`Running  '${setting.appname}:css'`)
    setting.src(`${setting.app_dir}/sass/index.scss`)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(concat(`${setting.appname}.css`))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(`${setting.public_static}/${setting.appname}`, {overwrite: true}))
        .on('end', function() {
            // setting.log(`Done '${setting.appname}:css'`)
            cb()
        })
}
module.exports = exports = function(setting) {
    gulp.task(`${setting.appname}:css`, cssFn.bind(this, setting))
}
module.exports.cssFn = cssFn
