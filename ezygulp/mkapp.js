const mkappFn = function(setting, cb) {
    var fs = require('fs')
    var replace = require('gulp-replace')
    setting.log(`Running  'mkapp'`, setting.appname)
    if (!setting.appname) {
        setting.log('Name is missing, syntax: gulp mkapp --name=name --dir=/path/to/app')
        cb()
        return
    }
    fs.stat(`${setting.newapp_dir}`, function(err, stat) {
        if (!err) {
            setting.log(`App ${setting.appname} already exists at ${setting.newapp_dir}`)
            cb()
            return
        }
        setting.srcNormalized(setting.files(setting.sample_dir))
            .pipe(setting.gulp.dest(setting.newapp_dir))
            .on('end', function() {
                setting.src(setting.gulpfile)
                    .pipe(replace(setting.commands.app.removal(), ''))
                    .pipe(replace(setting.commands.app.key, setting.commands.app.addon()))
                    .pipe(setting.gulp.dest('.', {overwrite: true}))
                    .on('end', cb)
            })
    })
}
const rmappFn = function(setting, cb) {
    var fs = require('fs')
    var clean = require('gulp-clean')
    var replace = require('gulp-replace')
    setting.log(`Running  'rmapp'`)
    if (!setting.ezy) {
        cb()
        return
    }
    if (!setting.appname) {
        setting.log('Name is missing, syntax: gulp rmapp --name=name')
        cb()
        return
    }
    setting.src(setting.gulpfile)
        .pipe(replace(setting.commands.app.removal(), ''))
        .pipe(setting.gulp.dest('.', {overwrite: true}))
        .on('end', function() {
            fs.stat(`${setting.newapp_dir}`, function(err, stat) {
                if (err) {
                    cb()
                    return
                }
                setting.src([
                    setting.newapp_dir,
                    `${setting.public_profile()}/${setting.appname}*`,
                    `${setting.public_static()}/${setting.appname}*`
                ])
                .pipe(clean({force: true}))
                .on('data', setting.ondata)
                .on('end', cb)
            })
        })
}
const includeappFn = function(setting, cb) {
    var fs = require('fs')
    var replace = require('gulp-replace')
    setting.log(`Running  'includeapp'`)
    if (!setting.ezy) {
        cb()
        return
    }
    if (!setting.appname) {
        setting.log('Name is missing, syntax: gulp includeapp --name=name --dir=/path/to/app')
        cb()
        return
    }
    fs.stat(`${setting.newapp_dir}`, function(err, stat) {
        if (err) {
            setting.log(`App ${setting.appname} does not exist`, err)
            cb()
            return
        }
        setting.src(setting.gulpfile)
            .pipe(replace(setting.commands.app.removal(), ''))
            .pipe(replace(setting.commands.app.key, setting.commands.app.addon()))
            .pipe(setting.gulp.dest('.', {overwrite: true}))
            .on('end', cb)
    })
}
const excludeappFn = function(setting, cb) {
    var replace = require('gulp-replace')
    setting.log(`Running  'excludeapp'`)
    if (!setting.ezy) {
        cb()
        return
    }
    if (!setting.appname) {
        setting.log('Name is missing, syntax: gulp excludeapp --name=name')
        cb()
        return
    }
    setting.src(setting.gulpfile)
        .pipe(replace(setting.commands.app.removal(), ''))
        .pipe(setting.gulp.dest('.', {overwrite: true}))
        .on('end', cb)
}
module.exports = exports = function(setting) {
    setting.gulp.task(`mkapp`, mkappFn.bind(this, setting))
    setting.gulp.task(`rmapp`, rmappFn.bind(this, setting))
    setting.gulp.task(`includeapp`, includeappFn.bind(this, setting))
    setting.gulp.task(`excludeapp`, excludeappFn.bind(this, setting))
}
module.exports.mkappFn = mkappFn
module.exports.rmappFn = rmappFn
module.exports.includeappFn = includeappFn
module.exports.excludeappFn = excludeappFn
