const injectFn = function(config, cb) {
    var inject = require('gulp-inject')
    var rename = require('gulp-rename')
    var replace = require('gulp-replace')
    config.log(`Running  '${config.ezy ? `${config.appname}:` : ''}inject'`)
    config.normalize(
        config.src(`${config.app_templates}/*.html`)
        .pipe(inject(config.gulp.src([
            `${config.public_static()}/${config.appname}/${config.appname}*.css`,
            `${config.public_static()}/${config.appname}/${config.appname}*.js`
        ]), {
            transform: function(file) {
                var filename = `{base}/static/${config.appname}${file.substr(file.lastIndexOf('/'))}`
                return /\.css$/.test(file) ? `<link href="${filename}" rel="stylesheet"/>` :
                /\.js$/.test(file) ? `<script src="${filename}" defer="true"></script>` : ''
            }
        }))
    )
    .pipe(replace('{base}', config.baseurl))
    .pipe(rename(path => path.basename = path.basename == 'index' ? config.appname : `${config.appname}${path.basename}`))
    .pipe(config.gulp.dest(`${config.public_profile()}`, {overwrite: true}))
    .on('end', cb)
}
module.exports = exports = function(config) {
    config.gulp.task(`${config.ezy ? `${config.appname}:` : ''}inject`, injectFn.bind(this, config))
}
module.exports.injectFn = injectFn
