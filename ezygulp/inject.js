const injectFn = function(setting, cb) {
    var inject = require('gulp-inject')
    var rename = require('gulp-rename')
    setting.log(`Running  '${setting.ezy ? `${setting.appname}:` : ''}inject'`)
    setting.normalize(
        setting.src(`${setting.app_templates}/*.html`)
        .pipe(inject(setting.gulp.src([
            `${setting.public_static()}/${setting.appname}/${setting.appname}*.css`,
            `${setting.public_static()}/${setting.appname}/${setting.appname}*.js`
        ]), {
            transform: function(file) {
                var filename = `{baseurl}/static/${setting.appname}${file.substr(file.lastIndexOf('/'))}`
                return /\.css$/.test(file) ? `<link href="${filename}" rel="stylesheet"/>` :
                /\.js$/.test(file) ? `<script src="${filename}" defer="true"></script>` : ''
            }
        }))
    )
    .pipe(rename(path => path.basename = path.basename == 'index' ? setting.appname : `${setting.appname}${path.basename}`))
    .pipe(setting.gulp.dest(`${setting.public_profile()}`, {overwrite: true}))
    .on('end', cb)
}
module.exports = exports = function(setting) {
    setting.gulp.task(`${setting.ezy ? `${setting.appname}:` : ''}inject`, injectFn.bind(this, setting))
}
module.exports.injectFn = injectFn
