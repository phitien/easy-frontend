var clean = require('gulp-clean')

module.exports = exports = function(setting) {
    setting.gulp.task(`${setting.appname}:mkprofile`, function(cb) {
        var profile = setting.normalizeName(setting.argv('profile'))
        if (!profile) {
            console.error(`Profile name is missing, syntax: gulp ${setting.appname}:mkprofile --profile=name`)
            cb()
            return
        }
        var fs = require('fs')
        fs.stat(`${setting.app_dir}/config/${profile}.jsx`, function(err, stat) {
            if (!err) return
            var replace = require('gulp-replace')
            var rename = require('gulp-rename')
            setting.srcNormalized(`${setting.ezy_sample}/config/dev.jsx`)
                .pipe(replace('dev', profile))
                .pipe(rename(`${profile}.jsx`))
                .pipe(setting.gulp.dest(`${setting.app_dir}/config`))
        })
        var replace = require('gulp-replace')
        var rename = require('gulp-rename')
        setting.srcNormalized(`${setting.ezy_sample}/pm2/dev.json`)
            .pipe(replace('dev', profile))
            .pipe(rename(`${profile}.json`))
            .pipe(setting.gulp.dest(`${setting.app_dir}/pm2`))
            .on('end', cb)
    })
    setting.gulp.task(`${setting.appname}:rmprofile`, function(cb) {
        var profile = setting.normalizeName(setting.argv('profile'))
        if (!profile) {
            console.error(`Profile name is missing, syntax: gulp ${setting.appname}:rmprofile --profile=name`)
            cb()
            return
        }
        setting.srcNormalized(
            `${setting.app_dir}/config/${profile}.jsx`,
            `${setting.app_dir}/pm2/${profile}.json`
        )
        .pipe(clean({force: true}))
        .on('data', function () {})
        .on('end', cb)
    })
}
