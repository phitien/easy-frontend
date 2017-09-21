const mkappFn = function(config, cb) {
    var fs = require('fs')
    var replace = require('gulp-replace')
    config.log(`Running  'mkapp'`, config.appname)
    if (!config.appname) {
        config.log('Name is missing, syntax: gulp mkapp --name=name --dir=/path/to/app')
        cb()
        return
    }
    fs.stat(`${config.newapp_dir}`, function(err, stat) {
        if (!err) {
            config.log(`App ${config.appname} already exists at ${config.newapp_dir}`)
            cb()
            return
        }
        config.srcNormalized(config.files(config.sample_dir))
            .pipe(config.gulp.dest(config.newapp_dir))
            .on('end', function() {
                config.src(config.gulpfile)
                    .pipe(replace(config.commands.app.removal(), ''))
                    .pipe(replace(config.commands.app.key, config.commands.app.addon()))
                    .pipe(config.gulp.dest('.', {overwrite: true}))
                    .on('end', cb)
            })
    })
}
const rmappFn = function(config, cb) {
    var fs = require('fs')
    var clean = require('gulp-clean')
    var replace = require('gulp-replace')
    config.log(`Running  'rmapp'`)
    if (!config.ezy) {
        cb()
        return
    }
    if (!config.appname) {
        config.log('Name is missing, syntax: gulp rmapp --name=name')
        cb()
        return
    }
    config.src(config.gulpfile)
        .pipe(replace(config.commands.app.removal(), ''))
        .pipe(config.gulp.dest('.', {overwrite: true}))
        .on('end', function() {
            fs.stat(`${config.newapp_dir}`, function(err, stat) {
                if (err) {
                    cb()
                    return
                }
                config.src([
                    config.newapp_dir,
                    `${config.public_profile()}/${config.appname}*`,
                    `${config.public_static()}/${config.appname}*`
                ])
                .pipe(clean({force: true}))
                .on('data', config.ondata)
                .on('end', cb)
            })
        })
}
const includeappFn = function(config, cb) {
    var fs = require('fs')
    var replace = require('gulp-replace')
    config.log(`Running  'includeapp'`)
    if (!config.ezy) {
        cb()
        return
    }
    if (!config.appname) {
        config.log('Name is missing, syntax: gulp includeapp --name=name --dir=/path/to/app')
        cb()
        return
    }
    fs.stat(`${config.newapp_dir}`, function(err, stat) {
        if (err) {
            config.log(`App ${config.appname} does not exist`, err)
            cb()
            return
        }
        config.src(config.gulpfile)
            .pipe(replace(config.commands.app.removal(), ''))
            .pipe(replace(config.commands.app.key, config.commands.app.addon()))
            .pipe(config.gulp.dest('.', {overwrite: true}))
            .on('end', cb)
    })
}
const excludeappFn = function(config, cb) {
    var replace = require('gulp-replace')
    config.log(`Running  'excludeapp'`)
    if (!config.ezy) {
        cb()
        return
    }
    if (!config.appname) {
        config.log('Name is missing, syntax: gulp excludeapp --name=name')
        cb()
        return
    }
    config.src(config.gulpfile)
        .pipe(replace(config.commands.app.removal(), ''))
        .pipe(config.gulp.dest('.', {overwrite: true}))
        .on('end', cb)
}
module.exports = exports = function(config) {
    config.gulp.task(`mkapp`, mkappFn.bind(this, config))
    config.gulp.task(`rmapp`, rmappFn.bind(this, config))
    config.gulp.task(`includeapp`, includeappFn.bind(this, config))
    config.gulp.task(`excludeapp`, excludeappFn.bind(this, config))
}
module.exports.mkappFn = mkappFn
module.exports.rmappFn = rmappFn
module.exports.includeappFn = includeappFn
module.exports.excludeappFn = excludeappFn
