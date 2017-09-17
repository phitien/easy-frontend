import inject from 'gulp-inject'
import rename from 'gulp-rename'

export const injectFn = function(setting, gulp, cb) {
    setting.log(`Run '${setting.appname}:inject'`)
    setting.normalize(
        setting.src(`${setting.app_templates}/*.html`)
        .pipe(inject(gulp.src([
            `${setting.public_static}/${setting.appname}/${setting.appname}*.css`,
            `${setting.public_static}/${setting.appname}/${setting.appname}*.js`
        ]), {
            transform: function(file) {
                let filename = `{rooturl}/static/${setting.appname}${file.substr(file.lastIndexOf('/'))}`
                return /\.css$/.test(file) ? `<link href="${filename}" rel="stylesheet"/>` :
                /\.js$/.test(file) ? `<script src="${filename}" defer="true"></script>` : ''
            }
        }))
    )
    .pipe(rename(path => path.basename = path.basename == 'index' ? setting.appname : `${setting.appname}${path.basename}`))
    .pipe(gulp.dest(setting.public, {overwrite: true}))
    .on('end', function() {
        // setting.log(`Done '${setting.appname}:inject'`)
        cb()
    })
}
export default function(setting, gulp) {
    gulp.task(`${setting.appname}:inject`, injectFn.bind(this, setting, gulp))
}
