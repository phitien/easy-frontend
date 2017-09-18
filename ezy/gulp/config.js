var gulp = require('gulp')

const configFn = function(setting, cb) {
    setting.log(`Running  '${setting.appname}:config'`)
    setting.srcNormalized(`${setting.ezy_sample}/config/index.jsx`)
        .pipe(gulp.dest(`${setting.app_dir}/config`, {overwrite: true}))
        .on('end', function() {
            // setting.log(`Done '${setting.appname}:config'`)
            cb()
        })
}
module.exports = exports = function(setting) {
    gulp.task(`${setting.appname}:config`, configFn.bind(this, setting))
}
module.exports.configFn = configFn
