export default function(setting, gulp) {
    gulp.task(`${setting.appname}:rmprofile`, function(cb) {
        let profile = setting.normalizeName(setting.argv('profile'))
        if (!profile) {
            console.error(`Profile name is missing, syntax: gulp ${setting.appname}:rmprofile --profile=name`)
            return
        }
        let clean = require('gulp-clean')
        setting.srcNormalized(
            `${setting.app_dir}/config/${profile}.jsx`,
            `${setting.app_dir}/pm2/${profile}.json`
        )
            .pipe(clean())
        cb()
    })
}
