export default function(setting, gulp) {
    gulp.task(`${setting.appname}:rmpage`, function(cb) {
        let pagename = setting.normalizeName(setting.argv('page'))
        if (!pagename) {
            console.error(`Page name is missing, syntax: gulp ${setting.appname}:mkpage --page=page`)
            return
        }
        let PAGENAME = pagename.toUpperCase()
        let PageName = pagename.toCamelCase()

        let replace = require('gulp-replace')
        setting.src(`${setting.app_dir}/pages/index.jsx`)
            .pipe(replace(setting.commands.page.pageRemoval(name, Name, NAME), ''))
            .pipe(gulp.dest(`${setting.app_dir}/pages`, {overwrite: true}))
        setting.src(`${setting.app_dir}/routes.jsx`)
            .pipe(replace(setting.commands.page.routeRemoval(name, Name, NAME), ''))
            .pipe(gulp.dest(`${setting.app_dir}`, {overwrite: true}))
        setting.src(`${setting.app_dir}/sass/index.scss`)
            .pipe(replace(setting.commands.page.sassRemoval(name, Name, NAME), ''))
            .pipe(gulp.dest(`${setting.app_dir}/sass`, {overwrite: true}))
        setting.src(
            `${setting.app_dir}/pages/${PageName}Page.jsx`,
            `${setting.app_dir}/sass/page-${pagename}.scss`
        )
            .pipe(clean({force: true}))
        cb()
    })
}
