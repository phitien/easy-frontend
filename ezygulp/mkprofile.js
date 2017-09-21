const mkprofileFn = function(config, cb) {
    var fs = require('fs')
    var replace = require('gulp-replace')
    var rename = require('gulp-rename')
    config.log(`Running  '${config.ezy ? `${config.appname}:` : ''}mkprofile'`)
    var profile = config.normalizedName
    if (!profile) {
        config.log(`Profile name is missing, syntax: gulp ${config.ezy ? `${config.appname}:` : ''}mkprofile --name=name`)
        cb()
        return
    }
    config.srcNormalized(`${config.sample_pm2}/dev.json`)
        .pipe(replace('dev', profile))
        .pipe(rename(`${profile}.json`))
        .pipe(config.gulp.dest(`${config.app_pm2}`))
        .on('end', function() {
            fs.stat(`${config.app_config}/${profile}.jsx`, function(err, stat) {
                if (!err) {
                    cb()
                    return
                }
                config.srcNormalized(`${config.sample_config}/dev.jsx`)
                    .pipe(replace('dev', profile))
                    .pipe(rename(`${profile}.jsx`))
                    .pipe(config.gulp.dest(`${config.app_config}`), {overwrite: true})
                    .on('end', cb)
            })
        })
}
const rmprofileFn = function(config, cb) {
    var clean = require('gulp-clean')
    config.log(`Running  '${config.ezy ? `${config.appname}:` : ''}rmprofile'`)
    var profile = config.normalizedName
    if (!profile) {
        config.log(`Profile name is missing, syntax: gulp ${config.ezy ? `${config.appname}:` : ''}rmprofile --name=name`)
        cb()
        return
    }
    else if (profile == 'base' || profile == 'index') {
        config.log(`Profile name is invalid, should not be index or base`)
        cb()
        return
    }
    config.src(
        `${config.app_config}/${profile}.jsx`,
        `${config.app_pm2}/${profile}.json`
    )
    .pipe(clean({force: true}))
    .on('data', config.ondata)
    .on('end', cb)
}
module.exports = exports = function(config) {
    config.gulp.task(`${config.ezy ? `${config.appname}:` : ''}mkprofile`, mkprofileFn.bind(this, config))
    config.gulp.task(`${config.ezy ? `${config.appname}:` : ''}rmprofile`, rmprofileFn.bind(this, config))
}
module.exports.mkprofileFn = mkprofileFn
module.exports.rmprofileFn = rmprofileFn
