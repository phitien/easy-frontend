const cssFn = function(setting, cb) {
    var sass = require('gulp-sass')
    var sourcemaps = require('gulp-sourcemaps')
    var autoprefixer = require('gulp-autoprefixer')
    var concat = require('gulp-concat')
    var run = require('run-sequence')
    setting.log(`Running  '${setting.ezy ? `${setting.appname}:` : ''}css'`)
    setting.src(`${setting.app_sass}/index.scss`)
        .pipe(setting.debug ? sourcemaps.init() : setting.noop())
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths: ['.', './node_modules', setting.app_home, `${setting.app_home}/node_modules`, setting.ezy_home, `${setting.ezy_home}/node_modules`]
        }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(concat(`${setting.appname}.css`))
        .pipe(setting.debug ? sourcemaps.write('./') : setting.noop())
        .pipe(setting.gulp.dest(`${setting.public_static()}/${setting.appname}`, {overwrite: true}))
        .on('end', cb)
}
module.exports = exports = function(setting) {
    setting.gulp.task(`${setting.ezy ? `${setting.appname}:` : ''}css`, cssFn.bind(this, setting))
}
module.exports.cssFn = cssFn
