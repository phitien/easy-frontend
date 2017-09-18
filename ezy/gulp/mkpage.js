var fs = require('fs')
var clean = require('gulp-clean')
var replace = require('gulp-replace')
var rename = require('gulp-rename')

module.exports = exports = function(setting) {
    setting.gulp.task(`${setting.appname}:mkpage`, function(cb) {
        var pagename = setting.normalizeName(setting.argv('name'))
        if (!pagename) {
            console.error(`Page name is missing, syntax: gulp ${setting.appname}:mkpage --name=name`)
            cb()
            return
        }
        var PAGENAME = pagename.toUpperCase()
        var PageName = pagename.toCamelCase()
        fs.stat(`${setting.app_dir}/pages/${PageName}Page.jsx`, function(err, stat) {
            if (!err) {
                console.error(`Page ${PageName} already exists`)
                cb()
                return
            }
            setting.srcNormalized(
                `${setting.ezy_sample}/pages/SubPage.jsx`,
                `${setting.ezy_sample}/sass/page-sub.scss`
            )
                .pipe(replace('sub', pagename))
                .pipe(replace('Sub', PageName))
                .pipe(replace('SUB', PAGENAME))
                .pipe(rename(`${PageName}Page.jsx`))
                .pipe(setting.gulp.dest(function (file) {
                    return file.base
                }))
            setting.src(`${setting.app_dir}/pages/index.jsx`)
                .pipe(replace(setting.commands.page.key, setting.commands.page.pageAddon(name, PageName, PAGENAME)))
                .pipe(setting.gulp.dest(`${setting.app_dir}/pages`, {overwrite: true}))
            setting.src(`${setting.app_dir}/routes.jsx`)
                .pipe(replace(setting.commands.page.key, setting.commands.page.routeAddon(name, PageName, PAGENAME)))
                .pipe(setting.gulp.dest(`${setting.app_dir}`, {overwrite: true}))
            setting.src(`${setting.app_dir}/sass/index.scss`)
                .pipe(replace(setting.commands.page.key, setting.commands.page.sassAddon(name, PageName, PAGENAME)))
                .pipe(setting.gulp.dest(`${setting.app_dir}/sass`, {overwrite: true}))
                .on('end', cb)
        })
    })

    setting.gulp.task(`${setting.appname}:rmpage`, function(cb) {
        var pagename = setting.normalizeName(setting.argv('page'))
        if (!pagename) {
            console.error(`Page name is missing, syntax: gulp ${setting.appname}:mkpage --page=page`)
            cb()
            return
        }
        var PAGENAME = pagename.toUpperCase()
        var PageName = pagename.toCamelCase()
        setting.src(`${setting.app_dir}/pages/index.jsx`)
            .pipe(replace(setting.commands.page.pageRemoval(name, Name, NAME), ''))
            .pipe(setting.gulp.dest(`${setting.app_dir}/pages`, {overwrite: true}))
        setting.src(`${setting.app_dir}/routes.jsx`)
            .pipe(replace(setting.commands.page.routeRemoval(name, Name, NAME), ''))
            .pipe(setting.gulp.dest(`${setting.app_dir}`, {overwrite: true}))
        setting.src(`${setting.app_dir}/sass/index.scss`)
            .pipe(replace(setting.commands.page.sassRemoval(name, Name, NAME), ''))
            .pipe(setting.gulp.dest(`${setting.app_dir}/sass`, {overwrite: true}))
        setting.src(
            `${setting.app_dir}/pages/${PageName}Page.jsx`,
            `${setting.app_dir}/sass/page-${pagename}.scss`
        )
            .pipe(clean({force: true}))
            .on('data', function () {})
            .on('end', cb)
    })

}
