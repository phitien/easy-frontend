const mkpageFn = function(setting, cb) {
    var fs = require('fs')
    var replace = require('gulp-replace')
    var rename = require('gulp-rename')
    setting.log(`Running  '${setting.ezy ? `${setting.appname}:` : ''}mkpage'`)
    var pagename = setting.normalizedName
    if (!pagename) {
        setting.log(`Page name is missing, syntax: gulp ${setting.appname}:mkpage --name=name`)
        cb()
        return
    }
    var PAGENAME = pagename.toUpperCase()
    var PageName = pagename.toCamelCase(true)
    fs.stat(`${setting.app_pages}/${PageName}Page.jsx`, function(err, stat) {
        if (!err) {
            setting.log(`Page ${PageName} already exists`)
            cb()
            return
        }
        setting.srcNormalized([
            `${setting.sample_pages}/SubPage.jsx`,
            `${setting.sample_sass}/page-sub.scss`
        ])
        .pipe(replace('sub', pagename))
        .pipe(replace('Sub', PageName))
        .pipe(replace('SUB', PAGENAME))
        .pipe(rename(`${PageName}Page.jsx`))
        .pipe(setting.gulp.dest(function (file) {return file.base}))
        .on('end', function() {
            setting.src(`${setting.app_pages}/index.jsx`)
            .pipe(replace(setting.commands.page.key, setting.commands.page.pageAddon(name, PageName, PAGENAME)))
            .pipe(setting.gulp.dest(`${setting.app_pages}`, {overwrite: true}))
            .on('end', function() {
                setting.src(`${setting.app_dir}/routes.jsx`)
                .pipe(replace(setting.commands.page.key, setting.commands.page.routeAddon(name, PageName, PAGENAME)))
                .pipe(setting.gulp.dest(`${setting.app_dir}`, {overwrite: true}))
                .on('end', function() {
                    setting.src(`${setting.app_sass}/index.scss`)
                    .pipe(replace(setting.commands.page.key, setting.commands.page.sassAddon(name, PageName, PAGENAME)))
                    .pipe(setting.gulp.dest(`${setting.app_sass}`, {overwrite: true}))
                    .on('end', cb)
                })
            })
        })
    })
}
const rmpageFn = function(setting, cb) {
    var fs = require('fs')
    var clean = require('gulp-clean')
    var replace = require('gulp-replace')
    setting.log(`Running  '${setting.ezy ? `${setting.appname}:` : ''}rmpage'`)
    var pagename = setting.normalizedName
    if (!pagename) {
        setting.log(`Page name is missing, syntax: gulp ${setting.appname}:mkpage --name=name`)
        cb()
        return
    }
    var PAGENAME = pagename.toUpperCase()
    var PageName = pagename.toCamelCase(true)
    setting.src(`${setting.app_dir}/routes.jsx`)
    .pipe(replace(setting.commands.page.routeRemoval(name, Name, NAME), ''))
    .pipe(setting.gulp.dest(`${setting.app_dir}`, {overwrite: true}))
    .on('end', function() {
        setting.src(`${setting.app_pages}/index.jsx`)
        .pipe(replace(setting.commands.page.pageRemoval(name, Name, NAME), ''))
        .pipe(setting.gulp.dest(`${setting.app_pages}`, {overwrite: true}))
        .on('end', function() {
            setting.src(`${setting.app_sass}/index.scss`)
            .pipe(replace(setting.commands.page.sassRemoval(name, Name, NAME), ''))
            .pipe(setting.gulp.dest(`${setting.app_sass}`, {overwrite: true}))
            .on('end', function() {
                setting.src([
                    `${setting.app_pages}/${PageName}Page.jsx`,
                    `${setting.app_sass}/page-${pagename}.scss`
                ])
                .pipe(clean({force: true}))
                .on('data', setting.ondata)
                .on('end', cb)
            })
        })
    })
}
module.exports = exports = function(setting) {
    setting.gulp.task(`${setting.ezy ? `${setting.appname}:` : ''}mkpage`, mkpageFn.bind(this, setting))
    setting.gulp.task(`${setting.ezy ? `${setting.appname}:` : ''}rmpage`, rmpageFn.bind(this, setting))
}
module.exports.mkpageFn = mkpageFn
module.exports.rmpageFn = rmpageFn
