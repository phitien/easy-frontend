import clean from 'gulp-clean'

export default function(setting, gulp) {
    gulp.task(`${setting.appname}:mkprofile`, function(cb) {
        let profile = setting.normalizeName(setting.argv('profile'))
        if (!profile) {
            console.error(`Profile name is missing, syntax: gulp ${setting.appname}:mkprofile --profile=name`)
            cb()
            return
        }
        let fs = require('fs')
        fs.stat(`${setting.app_dir}/config/${profile}.jsx`, function(err, stat) {
            if (!err) return
            let replace = require('gulp-replace')
            let rename = require('gulp-rename')
            setting.srcNormalized(`${setting.easy_sample}/config/dev.jsx`)
                .pipe(replace('dev', profile))
                .pipe(rename(`${profile}.jsx`))
                .pipe(gulp.dest(`${setting.app_dir}/config`))
        })
        let replace = require('gulp-replace')
        let rename = require('gulp-rename')
        setting.srcNormalized(`${setting.easy_sample}/pm2/dev.json`)
            .pipe(replace('dev', profile))
            .pipe(rename(`${profile}.json`))
            .pipe(gulp.dest(`${setting.app_dir}/pm2`))
            .on('end', cb)
    })
    gulp.task(`${setting.appname}:rmprofile`, function(cb) {
        let profile = setting.normalizeName(setting.argv('profile'))
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
