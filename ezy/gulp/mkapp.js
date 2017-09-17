import gulp from 'gulp'
import fs from 'fs'
import clean from 'gulp-clean'
import replace from 'gulp-replace'

export default function(setting) {
    gulp.task(`mkapp`, function(cb) {
        if (!setting.ezy) {
            cb()
            return
        }
        if (!setting.appname) {
            console.error('Name is missing, syntax: gulp mkapp --name=name --dir=/path/to/app')
            cb()
            return
        }
        let fs = require('fs')
        fs.stat(`${setting.dir}`, function(err, stat) {
            if (!err) {
                console.log(`App ${setting.appname} already exists`)
                cb()
                return
            }
            setting.srcNormalized(setting.files(setting.ezy_sample))
                .pipe(gulp.dest(setting.dir))
            if (setting.dir == setting.app_dir) setting.src(setting.gulpfile)
                .pipe(replace(setting.commands.app.removal(), ''))
                .pipe(replace(setting.commands.app.key, setting.commands.app.addon()))
                .pipe(gulp.dest('.', {overwrite: true}))
                .on('end', cb)
            else cb()
        })
    })
    gulp.task(`rmapp`, function(cb) {
        if (!setting.ezy) return
        if (!setting.appname) {
            console.error('Name is missing, syntax: gulp rmapp --name=name')
            cb()
            return
        }
        setting.src(setting.gulpfile)
            .pipe(replace(setting.commands.app.removal(), ''))
            .pipe(gulp.dest('.', {overwrite: true}))
        fs.stat(`${setting.app_dir}`, function(err, stat) {
            if (err) {
                cb()
                return
            }
            setting.src([
                setting.app_dir,
                `${setting.public}/${setting.appname}*`,
                `${setting.public_static}/${setting.appname}*`
            ], {read: false})
                .pipe(clean({force: true}))
                .on('data', function () {})
                .on('end', cb)
        })
    })
    gulp.task(`includeapp`, function(cb) {
        if (!setting.ezy) {
            cb()
            return
        }
        if (!setting.appname) {
            console.error('Name is missing, syntax: gulp includeapp --name=name --dir=/path/to/app')
            cb()
            return
        }
        let fs = require('fs')
        fs.stat(`${setting.app_dir}`, function(err, stat) {
            if (err) {
                setting.log(`App ${setting.appname} does not exist`, err)
                cb()
                return
            }
            setting.src(setting.gulpfile)
                .pipe(replace(setting.commands.app.removal(), ''))
                .pipe(replace(setting.commands.app.key, setting.commands.app.addon()))
                .pipe(gulp.dest('.', {overwrite: true}))
                .on('end', cb)
        })
    })
    gulp.task(`excludeapp`, function(cb) {
        if (!setting.ezy) {
            cb()
            return
        }
        if (!setting.appname) {
            console.error('Name is missing, syntax: gulp excludeapp --name=name')
            cb()
            return
        }
        setting.src(setting.gulpfile)
            .pipe(replace(setting.commands.app.removal(), ''))
            .pipe(gulp.dest('.', {overwrite: true}))
            .on('end', cb)
    })
}
