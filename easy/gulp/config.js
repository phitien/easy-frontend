export const configFn = function(setting, gulp, cb) {
    setting.log(`Run '${setting.appname}:config'`)
    setting.srcNormalized(`${setting.easy_sample}/config/index.jsx`)
        .pipe(gulp.dest(`${setting.app_dir}/config`, {overwrite: true}))
        .on('end', function() {
            // setting.log(`Done '${setting.appname}:config'`)
            cb()
        })
}
export default function(setting, gulp) {
    gulp.task(`${setting.appname}:config`, configFn.bind(this, setting, gulp))
}
