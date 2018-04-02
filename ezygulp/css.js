const cssFn = function(config, cb) {
    var sass = require('gulp-sass')
    var sourcemaps = require('gulp-sourcemaps')
    var autoprefixer = require('gulp-autoprefixer')
    var concat = require('gulp-concat')
    var run = require('run-sequence')
    config.log(`Running  '${config.ezy ? `${config.appname}:` : ''}css'`)
    config.src(`${config.app_sass}/index.scss`)
        .pipe(config.debug ? sourcemaps.init() : config.noop())
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths: ['.', './node_modules', config.app_home, `${config.app_home}/node_modules`, config.ezy_home, `${config.ezy_home}/node_modules`]
        })
        .on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(concat(`${config.appname}.css`))
        .pipe(config.debug ? sourcemaps.write('./') : config.noop())
        .pipe(config.gulp.dest(`${config.public_static()}/${config.appname}`, {overwrite: true}))
        .on('end', cb)
}
module.exports = exports = function(config) {
    config.gulp.task(`${config.ezy ? `${config.appname}:` : ''}css`, cssFn.bind(this, config))
}
module.exports.cssFn = cssFn
