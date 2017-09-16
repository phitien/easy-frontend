export default function(setting, gulp) {
    gulp.task(`${setting.appname}:mkprofile`, function(cb) {
        let profile = setting.normalizeName(setting.argv('profile'))
        if (!profile) {
            console.error(`Profile name is missing, syntax: gulp ${setting.appname}:mkprofile --profile=name`)
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
        cb()
    })
}
