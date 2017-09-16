export default function(setting, gulp) {
    gulp.task(`${setting.appname}:mkpage`, function(cb) {
        let pagename = setting.normalizeName(setting.argv('name'))
        if (!pagename) {
            console.error(`Page name is missing, syntax: gulp ${setting.appname}:mkpage --name=name`)
            return
        }
        let PAGENAME = pagename.toUpperCase()
        let PageName = pagename.toCamelCase()
        let fs = require('fs')
        fs.stat(`${setting.app_dir}/pages/${PageName}Page.jsx`, function(err, stat) {
            if (!err) {
                console.error(`Page ${PageName} already exists`)
                return
            }
            let replace = require('gulp-replace')
            let rename = require('gulp-rename')
            setting.srcNormalized(
                `${setting.easy_sample}/pages/SubPage.jsx`,
                `${setting.easy_sample}/sass/page-sub.scss`
            )
                .pipe(replace('sub', pagename))
                .pipe(replace('Sub', PageName))
                .pipe(replace('SUB', PAGENAME))
                .pipe(rename(`${PageName}Page.jsx`))
                .pipe(gulp.dest(function (file) {
                    return file.base
                }))
            setting.src(`${setting.app_dir}/pages/index.jsx`)
                .pipe(replace(setting.commands.page.key, setting.commands.page.pageAddon(name, PageName, PAGENAME)))
                .pipe(gulp.dest(`${setting.app_dir}/pages`, {overwrite: true}))
            setting.src(`${setting.app_dir}/routes.jsx`)
                .pipe(replace(setting.commands.page.key, setting.commands.page.routeAddon(name, PageName, PAGENAME)))
                .pipe(gulp.dest(`${setting.app_dir}`, {overwrite: true}))
            setting.src(`${setting.app_dir}/sass/index.scss`)
                .pipe(replace(setting.commands.page.key, setting.commands.page.sassAddon(name, PageName, PAGENAME)))
                .pipe(gulp.dest(`${setting.app_dir}/sass`, {overwrite: true}))
        })
        cb()
    })
}
