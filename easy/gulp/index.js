export default function(setting, gulp, easy) {
    setting = setting || {}
    setting.easy = easy
    require('easy/gulp/polish').default(setting, gulp)

    require('easy/gulp/mkprofile').default(setting, gulp)
    require('easy/gulp/rmprofile').default(setting, gulp)
    require('easy/gulp/mkpage').default(setting, gulp)
    require('easy/gulp/rmpage').default(setting, gulp)

    require('easy/gulp/clean').default(setting, gulp)
    require('easy/gulp/config').default(setting, gulp)
    require('easy/gulp/connect').default(setting, gulp)
    require('easy/gulp/copy').default(setting, gulp)
    require('easy/gulp/css').default(setting, gulp)
    require('easy/gulp/inject').default(setting, gulp)
    require('easy/gulp/js').default(setting, gulp)
    require('easy/gulp/vendor').default(setting, gulp)
    require('easy/gulp/watch').default(setting, gulp)

    gulp.task(`${setting.appname}:build`, [
        `${setting.appname}:config`,
        `${setting.appname}:copy`,
        `${setting.appname}:vendor`,
        `${setting.appname}:css`,
        `${setting.appname}:js`
    ])

    gulp.task(`${setting.appname}:serve`, [
        `${setting.appname}:inject`,
        `${setting.appname}:watch`,
        `${setting.appname}:connect`,
    ])
    gulp.task(`${setting.appname}`, [`${setting.appname}:build`, `${setting.appname}:serve`])
}
