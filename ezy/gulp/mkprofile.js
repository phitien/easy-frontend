const mkprofileFn = function(setting, cb) {
    var fs = require('fs')
    var replace = require('gulp-replace')
    var rename = require('gulp-rename')
    setting.log(`Running  '${setting.appname}:mkprofile'`)
    var profile = setting.name
    if (!profile) {
        setting.log(`Profile name is missing, syntax: gulp ${setting.appname}:mkprofile --name=name`)
        cb()
        return
    }
    setting.srcNormalized(`${setting.sample_pm2}/dev.json`)
        .pipe(replace('dev', profile))
        .pipe(rename(`${profile}.json`))
        .pipe(setting.gulp.dest(`${setting.app_pm2}`))
        .on('end', function() {
            fs.stat(`${setting.app_config}/${profile}.jsx`, function(err, stat) {
                if (!err) {
                    cb()
                    return
                }
                setting.srcNormalized(`${setting.sample_config}/dev.jsx`)
                    .pipe(replace('dev', profile))
                    .pipe(rename(`${profile}.jsx`))
                    .pipe(setting.gulp.dest(`${setting.app_config}`), {overwrite: true})
                    .on('end', cb)
            })
        })
}
const rmprofileFn = function(setting, cb) {
    var clean = require('gulp-clean')
    setting.log(`Running  '${setting.appname}:rmprofile'`)
    var profile = setting.name
    if (!profile) {
        setting.log(`Profile name is missing, syntax: gulp ${setting.appname}:rmprofile --name=name`)
        cb()
        return
    }
    setting.src(
        `${setting.app_config}/${profile}.jsx`,
        `${setting.app_pm2}/${profile}.json`
    )
    .pipe(clean({force: true}))
    .on('end', cb)
}
module.exports = exports = function(setting) {
    setting.gulp.task(`${setting.appname}:mkprofile`, mkprofileFn.bind(this, setting))
    setting.gulp.task(`${setting.appname}:rmprofile`, rmprofileFn.bind(this, setting))
}
module.exports.mkprofileFn = mkprofileFn
module.exports.rmprofileFn = rmprofileFn
